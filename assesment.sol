// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CaloriesCalculator {
    uint256 public calories;
    uint256 public cups;
    uint256 constant CALORIES_PER_CUP = 140;

    // Event to emit when calories are updated
    event CaloriesUpdated(uint256 totalCalories);
    // Event to emit when calories are reset
    event CaloriesReset();

    // Function to update the number of cups and calculate the total calories
    function updateCalories(uint256 _cups) public {
        cups = _cups;
        calories = cups * CALORIES_PER_CUP;
        emit CaloriesUpdated(calories);
    }

    // Function to reset the calories and cups
    function resetCalories() public {
        cups = 0;
        calories = 0;
        emit CaloriesReset();
    }
}
