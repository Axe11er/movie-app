import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
   document.getElementById('root')
);


// import { Rate } from 'antd';
// import 'antd/dist/antd.css';
// const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

// class Rater extends React.Component {
//   state = {
//     value: 3,
//   };

//   handleChange = value => {
//     this.setState({ value });
//   };

//   render() {
//     const { value } = this.state;
//     return (
//       <span>
//         <Rate tooltips={desc} onChange={this.handleChange} value={value} />
//         {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
//       </span>
//     );
//   }
// }

// ReactDOM.render(<Rater />, document.querySelector('#root'));