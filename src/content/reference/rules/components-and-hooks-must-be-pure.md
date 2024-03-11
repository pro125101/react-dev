---
title: Components and Hooks must be pure
---

<Intro>
TODO
</Intro>

<InlineToc />

---

## Components must be idempotent {/*components-must-be-idempotent*/}

React components are assumed to always return the same output with respect to their props. This is known as [idempotency](https://stackoverflow.com/questions/1077412/what-is-an-idempotent-operation).

Put simply, idempotence means that you [always get the same result everytime](learn/keeping-components-pure) you run that piece of code.

```js {3}
function NewsFeed({ items }) {
  // ✅ Array.filter doesn't mutate `items`
  const filteredItems = items.filter(item => item.isDisplayed === true);
  return (
    <ul>
      {filteredItems.map(item => <li key={item.id}>{item.text}</li>}
    </ul>
  );
}
```

This means that _all_ code that runs during render must also be idempotent in order for this rule to hold. For example, this line of code is not idempotent (and therefore, neither is the component) and breaks this rule:

```js {2}
function Clock() {
  const date = new Date();  // ❌ always returns a different result!
  return <div>{date}</div>
}
```

`new Date()` is not idempotent as it always returns the current date and changes its result every time it's called. When you render the above component, the time displayed on the screen will stay stuck on the time that the component was rendered. Similarly, functions like `Math.random()` also aren't idempotent, because they return different results every time they're called, even when the inputs are the same.

Try building a component that displays the time in real-time in our [challenge](learn/keeping-components-pure#challenges) to see if you follow this rule!

## Side effects must run outside of render {/*side-effects-must-run-outside-of-render*/}

[Side effects](http://localhost:3000/learn/keeping-components-pure#side-effects-unintended-consequences) should not run in render, as React can render components multiple times to create the best possible user experience.

While render must be kept pure, side effects are necessary at some point in order for your app to do anything interesting, like showing something on the screen! The key point of this rule is that side effects should not run in render, as React can render components multiple times. In most cases, you'll use [event handlers](learn/responding-to-events) to handle side effects.

For example, you might have an event handler that displays a confirmation dialog after the user clicks a button. Using an event handler explicitly tells React that this code doesn't need to run during render, keeping render pure. If you've exhausted all options – and only as a last resort – you can also handle side effects using `useEffect`.

<DeepDive>
#### Why does render need to be pure? {/*why-does-render-need-to-be-pure*/}
UI libraries like React take care of when your code runs for you so that your application has a great user experience. React is declarative: you tell React what to render in your component's logic, and React will figure out how best to display it to your user!

When render is kept pure, React can understand how to prioritize which updates are most important for the user to see first. This is made possible because of render purity: since components don't have side effects in render, React can pause rendering components that aren't as important to update, and only come back to them later when it's needed.

Concretely, this means that rendering logic can be run multiple times in a way that allows React to give your user a pleasant user experience. However, if your component has an untracked side effect – like modifying the value of a global variable during render – when React runs your rendering code again, your side effects will be triggered in a way that won't match what you want. This often leads to unexpected bugs that can degrade how your users experience your app.
</DeepDive>

### When is it okay to have mutation? {/*mutation*/}
One common example of a side effect is mutation, which refers to changing the value of a non-[primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) value. In general, while mutation is not idiomatic in React, _local_ mutation is absolutely fine:

```js {2}
function FriendList({ friends }) {
  let items = []; // ✅ locally created and mutated
  for (let i = 0; i < friends.length; i++) {
    let friend = friends[i];
    items.push(
      <Friend key={friend.id} friend={friend} />
    );
  }
  return <section>{items}</section>;
}
```

There is no need to contort your code to avoid local mutation. In particular, [`Array.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) could also be used here for brevity, but there is nothing wrong with creating a local array and then pushing items into it during render.

Even though it looks like we are mutating `items`, the key point to note is that this code only does so locally – the mutation isn't "remembered" when the component is rendered again. In other words, `items` only stays around as long as the component does. Because `items` is always recreated every time `<FriendList />` is rendered, the component will always returns the same result.

On the other hand, if `items` was created outside of the component, it holds on to its previous values and remembers changes:

```js {1}
let items = []; // ❌ created outside of the component
function FriendList({ friends }) {
  // Push `friends` into `items`...
  return <section>{items}</section>;
}
```

When `<FriendList />` runs again, we will continue appending `friends` to `items` every time that component is run, leading to multiple duplicated results. This version of `<FriendList />` has observable side effects during render and **breaks the rule**.

Similarly, lazy initialization is fine despite not being fully "pure":

```js {2}
function ExpenseForm() {
  SuperCalculator.initializeIfNotReady(); // ✅ Fine if it doesn't affect other components
  // Continue rendering...
}
```

Side effects that are directly visible to the user are not allowed in the render logic of React components. In other words, merely calling a component function shouldn’t by itself produce a change on the screen.

```js {2}
function ProductDetailPage({ product }) {
  document.window.title = product.title; // ❌
}
```

As long as calling a component multiple times is safe and doesn’t affect the rendering of other components, React doesn’t care if it’s 100% pure in the strict functional programming sense of the word. It is more important that [components must be idempotent](/reference/rules/components-must-be-idempotent).

## Props and state are immutable {/*props-and-state-are-immutable*/}

A component's props and state are immutable [snapshots](learn/state-as-a-snapshot) with respect to a single render. Never mutate them directly.

You can think of the props and state values as snapshots that are updated after rendering. For this reason, you don't modify the props or state variables directly: instead you pass new props, or use the setter function provided to you to tell React that state needs to update the next time the component is rendered.

### Don't mutate Props {/*props*/}
When followed, this rule allows React to understand that values that flow from props aren't mutated when they're passed as arguments to functions, allowing certain optimizations to be made. Mutating props may also indicate a bug in your app – changing values on the props object doesn't cause the component to update, leaving your users with an outdated UI.

```js {2}
function Post({ item }) {
  item.url = new Url(item.url, base); // ❌ never mutate props directly
  return <Link url={item.url}>{item.title}</Link>;
}
```

```js {2}
function Post({ item }) {
  const url = new Url(item.url, base); // ✅ make a copy instead
  return <Link url={url}>{item.title}</Link>;
}
```

### Don't mutate State {/*state*/}
`useState` returns the state variable and a setter to update that state.

```js
const [stateVariable, setter] = useState(0);
```

Rather than updating the state variable in-place, we need to update it using the setter function that is returned by `useState`. Changing values on the state variable doesn't cause the component to update, leaving your users with an outdated UI. Using the setter function informs React that the state has changed, and that we need to queue a re-render to update the UI.

```js {5}
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    count = count + 1; // ❌ never mutate state directly
  }

  return (
    <button onClick={handleClick}>
      You pressed me {count} times
    </button>
  );
}
```

```js {5}
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1); // ✅ use the setter function returned by useState
  }

  return (
    <button onClick={handleClick}>
      You pressed me {count} times
    </button>
  );
}
```