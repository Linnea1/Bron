"use strict";

function stickyNav() {
  return `
    <ul>
      <li class="nav-home" onclick="RenderOptions()">
        <i class="fa-solid fa-house"></i>
        <p class="nav-icon-name text-awards">Hem</p>
      </li>
      <li class="nav-suspects" onclick="RenderSuspects()">
        <i class="fa-solid fa-person"></i>
        <p class="nav-icon-name text-groups">Misstänkta</p>
      </li>
      <li class="nav-clues" onclick="RenderClues()">
        <i class="fa-solid fa-clipboard-question"></i>
        <p class="nav-icon-name text-house">Ledtrådar</p>
      </li>
      <li class="nav-arrest" onclick="RenderMakeArrest()">
        <i class="fa-solid fa-handcuffs"></i>
        <p class="nav-icon-name text-profile">Arrestering</p>
        </li>
    </ul>
  `;
}