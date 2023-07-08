const colorEl = document.getElementById("color")
const schemeEl = document.getElementById("scheme")
colorEl.value = "#d6b24c"
// load
window.addEventListener("load", getData)
// copy to clipboard
document.addEventListener("click", function (e) {
   if (e.target.dataset.tooltip) {
      navigator.clipboard.writeText(e.target.dataset.tooltip)
      var tooltip = document.getElementById("myTooltip")
      tooltip.innerHTML = "Copied: " + e.target.dataset.tooltip
      console.log(e.target.dataset.tooltip)
   }
})
document.addEventListener("mouseout", function (e) {
   if (e.target.dataset.tooltip) {
      var tooltip = document.getElementById("myTooltip")
      tooltip.innerHTML = "Copy to clipboard"
   }
})

// get color scheme button
document.getElementById("get-color-btn").addEventListener("click", function () {
   getData()
})

function getData() {
   fetch(
      `https://www.thecolorapi.com/scheme?hex=${colorEl.value.slice(1)}&mode=${
         schemeEl.value
      }&count=5`
   )
      .then((res) => res.json())
      .then((data) => renderColorHtml(data))
}
// render data
function renderColorHtml(data) {
   let colorContainerHtml = ""
   let hexHtml = ""
   data.colors.forEach((e) => {
      colorContainerHtml += `<div class="color col1" data-tooltip="${e.hex.value}" style="background-color: ${e.hex.value};"></div>`
      hexHtml += `<h3 data-tooltip="${e.hex.value}" >${e.hex.value}</h3>`
   })
   document.getElementById("color-container").innerHTML = colorContainerHtml
   document.getElementById("hex").innerHTML = hexHtml
   console.log("isloaded")
}
