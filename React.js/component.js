
function Tag(props) {
  let that = this;
  
  return <h1 style={{backgroundColor: 'red'}}>
    <span style={{backgroundColor: 'blue'}}>
      {props.name + that.counter++}
    </span>
    </h1>;
}

Object.defineProperty(Tag.prototype, 'counter', {
  configurable: true,
  enumberable: true,
  value: 0,
  writable: true
  }
);

let elem = <Tag name='first'/>
let elem2 = <Tag name='second'/>
let parentElement = <div>
      {elem}
      {elem2}
 </div>;

ReactDOM.render(
  parentElement,
  document.getElementById('root')
);
