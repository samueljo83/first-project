let a;
let b;
let c;

document.getElementById("submit").onclick = function(){
  document.getElementById("NumberA").value;
  a = Number(a);

  document.getElementById("NumberB").value;
  b = Number(b);
  
  c = math.sqrt(math.pow(a, 2) + math.pow(b, 4));
  document.getElementById("lableC").innerHTML = "the result is" + c;
}