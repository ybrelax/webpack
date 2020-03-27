const outputMsg = () => {
  console.log("发起请求");
  fetch("/api/info")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log("err:", err));
};

export default outputMsg;
