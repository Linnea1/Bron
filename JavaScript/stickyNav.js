"use strict";

function stickyNav() {
  return `
    <ul>
      <li class="nav-home">
        <i class="fa-solid fa-house"></i>
        <p class="nav-icon-name text-awards">Home</p>
      </li>
      <li class="nav-suspects">
        <i class="fa-solid fa-person"></i>
        <p class="nav-icon-name text-groups">Suspects</p>
      </li>
      <li class="nav-clues">
        <i class="fa-solid fa-clipboard-question"></i>
        <p class="nav-icon-name text-house">Clues</p>
      </li>
      <li class="nav-arrest">
        <i class="fa-solid fa-handcuffs"></i>
        <p class="nav-icon-name text-profile">Arrest</p>
        </li>
    </ul>
  `;
}