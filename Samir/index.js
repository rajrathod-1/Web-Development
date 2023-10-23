document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".custom-dropdown");
    const resultPopup = document.getElementById("result-popup");
    const closePopup = document.getElementById("closePopup");
    const resultContent = document.getElementById("result");
  
    // Populate dropdowns
    const D1 = ["Short Term Fundamental", "Short Term Technical", "Pump and Dump"];
    const D2 = ["Price Retain above 50%", "Price Retain above 70%", "Price dropped below 70%"];
    const D3 = ["Relatively High", "Relatively Low", "Inconsistent"];
  
    function populateDropdown(dropdownId, options) {
      const dropdownButton = document.getElementById(dropdownId);
      const dropdownContent = document.getElementById(`dropdownContent${dropdownId.slice(-1)}`);
  
      dropdownButton.addEventListener("click", function () {
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          // Close other dropdowns
          closeDropdowns();
          dropdownContent.style.display = "block";
        }
      });
  
      options.forEach(option => {
        const item = document.createElement('a');
        item.classList.add('dropdown-item');
        item.textContent = option;
        item.addEventListener('click', () => {
          selectOption(option, dropdownId);
        });
        dropdownContent.appendChild(item);
      });
    }
  
    dropdowns.forEach((dropdown, index) => {
      const options = [D1, D2, D3][index];
      const dropdownId = `dropdownCondition${index + 1}`;
      populateDropdown(dropdownId, options);
    });
  
    const selectedConditions = Array(3).fill(null);
  
    function selectOption(option, dropdownId) {
      const index = dropdownId.slice(-1) - 1;
  
      selectedConditions[index] = option;
  
      const dropdownButton = document.getElementById(dropdownId);
      dropdownButton.textContent = option;
  
      // Check if all conditions are selected
      if (selectedConditions.every(condition => condition !== null)) {
        calculateResult(selectedConditions);
      }
  
      closeDropdowns();
    }
  
    function closeDropdowns() {
      dropdowns.forEach(dropdown => {
        dropdown.querySelector(".dropdown-content").style.display = "none";
      });
    }
  
    function calculateResult(conditions) {
      resultContent.innerHTML = "Result: " + conditions.join(" / ");
      resultPopup.style.display = "block";
    }
  
    closePopup.addEventListener("click", () => {
      resultPopup.style.display = "none";
      selectedConditions.fill(null);
      dropdowns.forEach(dropdown => {
        dropdown.querySelector(".custom-button").textContent = "Select Condition";
      });
    });
  });
  