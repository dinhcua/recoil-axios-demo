import React from 'react';
import { atom, RecoilRoot, selector, useRecoilState, useRecoilValue } from 'recoil';
import './App.css';

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

function TextInput() {
  const [text, setText] = useRecoilState(textState)

  const onChange = (event) => {
    setText(event.target.value)
  }

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <p>{text}</p>
    </div>
  )
}

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}

const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});

function App() {
  return (
    <div className="App">

      <RecoilRoot>
        <TextInput />
        <CharacterCount />
      </RecoilRoot>
    </div>
  );
}

export default App;
