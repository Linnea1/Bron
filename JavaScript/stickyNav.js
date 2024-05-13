"use strict";

function stickyNav() {
  document.querySelector("nav").innerHTML = `
    <ul>
      <li class="nav-home nav-box" onclick="RenderOptions()">
        <i class="fa-solid fa-house"></i>
        <p class="nav-icon-name text-home"></p>
      </li>
      <li class="nav-suspects nav-box fullscreen" onclick="RenderSuspects(false)">
        <i class="fa-solid fa-person"></i>
        <p class="nav-icon-name text-suspects"></p>
      </li>
      <li class="nav-map nav-box" onclick="renderCurrentLocationView(false)">
      <i class="fa-solid fa-map"></i>
        <p class="nav-icon-name text-home"></p>
        </li>
      <li class="nav-clues nav-box fullscreen" onclick="RenderClues(false)">
        <i class="fa-solid fa-clipboard-question"></i>
        <p class="nav-icon-name text-clue"></p>
      </li>
      <li class="nav-arrest nav-box fullscreen" onclick="RenderMakeArrest()">
        <i class="fa-solid fa-handcuffs"></i>
        <p class="nav-icon-name text-arrest"></p>
      </li>
    </ul>
  `;
}


