const menuItems = {
  rice: [
    "White Rice",
    "Bhagara Rice",
    "Chicken Biryani",
    "Chicken Dum Bieyani",
    "Mutton Biryani",
    "Mutton Dum Biryani",
    "Fish Biryani",
    "Prawns Biryani",
  ],
  roti: ["Chapathi", "Pulka", "Poori", "Rumal Roti"],
  gravycurry: [
    "Chicken Curry",
    "Butter Chicken Curry(Boneless)",
    "Butter Chicken Curry",
    "Gongura Chicken Curry",
    "Kadai Chicken Curry",
    "Mutton Curry",
    "Butter Mutton",
    "Gongura Mutton",
  ],
  fry: [
    "Chicken Fry",
    "Dum Chicken Fry",
    "Chicken Kaju Fry",
    "Mutton Fry",
    "Dum Mutton Fry",
    "Mutton Kaju Fry",
  ],
  starters: [
    "Chicken 65",
    "Chilli Chicken",
    "Pepper Chicken",
    "Chicken Pakodi",
    "Kaju Chicken Pakodi",
    "Mutton 65",
    "Chilli Mutton",
    "Pepper Mutton",
    "Mutton Pakodi Kaju",
    "Fish 65",
    "Prawns 65",
  ],
  seafoods: [
    "Fish Curry",
    "Fish Pulusu",
    "Prawns Curry",
    "Kaju Prawns Curry",
    "Mango Prawns Curry",
    "Fish Fry",
    "Appolo Fish",
    "Fish Kaju Fry",
    "Prawns Fry",
    "Prawns Kaju Fry",
  ],
  sambar:["saambar","Rasam"],
  curd: ["Curd", "Raita"],
  sweets: [
    "Badusha",
    "Bobbatlu",
    "Pornam",
    "carrot Halwa",
    "Sorakaya Halwa",
    "Double Ka Meeta",
    "Gulab Jaamun",
    "Kala Jaamun"
  ],
  hot: [
    "Aloo Samosa",
    "Mirchi Bajji",
    "Masala Vada",
    "Gaari",
    "Sweet Corn Samosa",
  ],
  extraitems: [
    "Fruit Salad",
    "Ice Cream",
    "Sweet Paan,Paan",
    "Welcome Drink",
  ],
  extraservice: ["Boys", "Water"],
};

function loadMenu() {
  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "";

  Object.entries(menuItems).forEach(([category, items]) => {
    const section = document.createElement("div");
    section.className = "category-section";

    const heading = document.createElement("h4");
    heading.innerText = `${category.charAt(0).toUpperCase() + category.slice(1)} Items`;
    section.appendChild(heading);

    const column = document.createElement("div");
    column.className = "menu-column";

    items.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = `menu-item ${category}`;
      itemDiv.innerText = item;
      itemDiv.addEventListener("click", () => {
        itemDiv.classList.toggle("selected");
        updatePreview();
      });
      column.appendChild(itemDiv);
    });

    section.appendChild(column);
    menuDiv.appendChild(section);
  });
}

function updatePreview() {
  const preview = document.getElementById("selectedPreview");
  preview.innerHTML = "";

  Object.keys(menuItems).forEach((category) => {
    const selected = Array.from(
      document.querySelectorAll(`.menu-item.${category}.selected`)
    ).map((el) => el.innerText);
    if (selected.length > 0) {
      const section = document.createElement("div");
      section.innerHTML =
        `<strong>${category.toUpperCase()}:</strong><br>` +
        selected.map((i) => `• ${i}`).join("<br>");
      preview.appendChild(section);
    }
  });
}

function sendToWhatsApp() {
  const members = document.getElementById("members").value;
  const functionDate = document.getElementById("functionDate").value;
  const functionTime = document.getElementById("functionTime").value;

  if (!members) {
    alert("Please enter the number of members.");
    return;
  }

  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  let message = `Sri Sai Caterers Order\n`;
  message += `Order Date: ${date}\n`;
  message += `Order Time: ${time}\n`;
  message += `Function Date: ${functionDate}\n`;
  message += `Function Time: ${functionTime}\n`;
  message += `Members: ${members}\n\n`;

  Object.keys(menuItems).forEach((category) => {
    const selected = Array.from(
      document.querySelectorAll(`.menu-item.${category}.selected`)
    ).map((el) => el.innerText);

    if (selected.length > 0) {
      const heading = category.toUpperCase();
      const underline = "‾".repeat(heading.length);
      message += `*${heading}*\n${underline}\n${selected
        .map((item) => `• ${item}`)
        .join("\n")}\n\n`;
    }
  });

  if (message.trim() === "") {
    alert("Please select at least one menu item.");
    return;
  }

  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", loadMenu);
