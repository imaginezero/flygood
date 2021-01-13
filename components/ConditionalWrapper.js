// Thanks to https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2
const ConditionalWrapper = ({ condition, wrapper, children }) => 
  condition ? wrapper(children) : children;