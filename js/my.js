//dom
var height = document.getElementById("height");
var weight = document.getElementById("weight");
var checkBtn = document.querySelector(".chkBtn");
var date = document.querySelector(".date");
var data = JSON.parse(localStorage.getItem("bmi")) || [];
var list = document.querySelector(".list");

//監聽
checkBtn.addEventListener("click", calculateBmi, false);

updateList(data);

//function
function calculateBmi(e) {
  if (e.target.nodeName !== "A") {
    return;
  }
  var hei = height.value;
  var wei = weight.value;
  var hh = hei / 100;
  var bmi = (wei / (hh * hh)).toFixed(2);
  var bmiRst = result(bmi);
  var Today = new Date();
  var dateStr =
    Today.getFullYear() + "-" + (Today.getMonth() + 1) + "-" + Today.getDate();

  if (hei != "" && wei != "") {
    var bmiList = {
      result: bmiRst,
      bmi: bmi,
      height: hei + "CM",
      weight: wei + "KG",
      dateStr: dateStr,
    };
    data.push(bmiList);
    //btn更換
    updateBtn(bmiList);
  }
  localStorage.setItem("bmi", JSON.stringify(data));
  //list資料渲染
  updateList(data);
}

function result(bmi) {
  console.log(bmi);
  if (bmi < 18.5) {
    return "過輕";
  } else if (bmi >= 18.5 && bmi < 24) {
    return "健康體位";
  } else {
    if (bmi >= 24 && bmi < 27) {
      return "過重";
    } else if (bmi >= 27 && bmi < 30) {
      return "輕度肥胖";
    } else if (bmi >= 30 && bmi < 35) {
      return "中度肥胖";
    } else {
      return "重度肥胖";
    }
  }
}
//list資料渲染
function updateList(data) {
  str = "";
  for (var i = 0; i < data.length; i++) {
    var color = chkColor(data[i].bmi);
    var shaColor = chkShadowColor(data[i].bmi);
    var content =
      "<li class='record d-flex-list'><div class='box' style='background:" +
      color +
      "; box-shadow:" +
      shaColor +
      " ;'></div><h3>" +
      data[i].result +
      "</h3><h4 class='bmi-num'>BMI<span>" +
      data[i].bmi +
      "</span></h4><h4 class='wei-num'>weight<span>" +
      data[i].weight +
      "</span></h4><h4 class='hei-num'>height<span>" +
      data[i].height +
      "</span></h4><div class='date'>" +
      data[i].dateStr +
      "</div></li>";
    str += content;
  }
  list.innerHTML = str;
  if (data.length > 0) {
    document.querySelector(".note").style.display = "none";
  }
}

function chkColor(bmi) {
  if (bmi < 18.5) {
    return "#31baf9";
  } else if (bmi >= 18.5 && bmi < 24) {
    return "#86d73f";
  } else {
    if (bmi >= 24 && bmi < 27) {
      return "#ff982d";
    } else if (bmi >= 27 && bmi < 30) {
      return "#ff6c03";
    } else if (bmi >= 30 && bmi < 35) {
      return "#ff6c03";
    } else {
      return "#ff1200";
    }
  }
}

function chkShadowColor(bmi) {
  if (bmi < 18.5) {
    return "2px 0 3px 0 rgba(49,186,249,0.29)";
  } else if (bmi >= 18.5 && bmi < 24) {
    return "#86d73f";
  } else {
    if (bmi >= 24 && bmi < 27) {
      return "2px 0 3px 0 rgba(255,152,45,0.29)";
    } else if (bmi >= 27 && bmi < 30) {
      return "2px 0 3px 0 rgba(255,108,2,0.29)";
    } else {
      return "2px 0 3px 0 rgba(255,108,2,0.29)";
    }
  }
}

//btn更換
function updateBtn(data) {
  console.log(data);
  var elBtn = document.querySelector(".chkBtn");
  var elBtnHover = document.querySelector(".chkBtn:hover");
  var elDivImg = document.createElement("div");
  var elImg = document.createElement("img");
  var elStr = document.createElement("div");

  elBtn.style.background = "transparent";
  elBtn.style.border = "6px solid " + chkColor(parseInt(data.bmi));
  elBtnHover.style.boxShadow = "none";
  elBtn.style.color = chkColor(parseInt(data.bmi));
  elBtn.style.fontSize = "32px";
  elBtn.style.lineHeight = "110px";
  elBtn.textContent = data.bmi;

  elDivImg.className = "icon";
  elDivImg.style.background = chkColor(parseInt(data.bmi));
  elImg.src = "images/icons_loop.png";
  elStr.className = "title1";
  elStr.textContent = "BMI";
  elStr.style.color = chkColor(parseInt(data.bmi));

  elDivImg.appendChild(elImg);
  elBtn.appendChild(elDivImg);
  elBtn.appendChild(elStr);
}
