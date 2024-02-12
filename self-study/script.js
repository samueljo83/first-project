let username;
document.getElementById("SendName").onclick = function(){

  username = document.getElementById("TextBox").value;
  document.getElementById("title").innerHTML = "Nice to meet you Mr." + username;
}