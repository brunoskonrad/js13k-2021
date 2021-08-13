/**
 * I'm fully aware that what you're about to witness isn't a prime
 * example of how to implement a small widget. However, it was quick
 * to make and I don't think I'll have to touch it again in the future.
 *
 * Enjoy the ride!
 */

(() => {
  const impactWidget = document.createElement("aside");
  impactWidget.classList.add("impact-changes");

  const toggleButton = document.createElement("button");
  toggleButton.classList.add("open-impact-changes");
  toggleButton.innerText = "⚜️";

  document.body.appendChild(impactWidget);
  document.body.appendChild(toggleButton);

  toggleButton.addEventListener("click", toggleImpactWidget);

  function toggleImpactWidget() {
    const widget = document.querySelector("aside");

    widget.classList.toggle("impact-changes--visible");

    if (widget.classList.contains("impact-changes--visible")) {
      fetchImpactChangeData();
    }
  }

  async function fetchImpactChangeData() {
    const response = await fetch("/api/impact-changes");
    const data = await response.json();

    render(data);
  }

  function render(data) {
    impactWidget.innerHTML = `
      <div>
        ${renderCurrentSize(data)}

        ${renderCurrentBranchSizes(data)}
      </div>
    `;
  }

  function renderCurrentSize(data) {
    const isProjectSizeOverLimit =
      data.currentBranchSize.total > data.maximumGameSize;
    const emoji = isProjectSizeOverLimit ? "🙅" : "🎉";
    const message = isProjectSizeOverLimit
      ? `The current changes are increasing the bundle size over ${
          data.maximumGameSize / 1024
        }kb.`
      : "All good, keep on going!";

    return `
      <h2>
        <span>${emoji}</span>
        <span>${message}</span>
      </h2>
    `;
  }

  function renderCurrentBranchSizes(data) {
    const {
      currentBranchSize: {
        branchName,
        htmlSize,
        javascriptSize,
        spritesheetSize,
        total,
        percentageFormatted,
      },
    } = data;

    const percentageFrom = percentageFor(total);

    const percentages = [
      { value: percentageFrom(htmlSize), type: "HTML", color: "#fc8e3f" },
      {
        value: percentageFrom(javascriptSize),
        type: "JavaScript",
        color: "#fcec3f",
      },
      {
        value: percentageFrom(spritesheetSize),
        type: "Spritesheet",
        color: "#f294fc",
      },
    ];

    const progressBarItem = percentages.map((percentage) => {
      return `<div class="impact-progress-bar__item" style="width: ${percentage.value}%; background-color: ${percentage.color};"></div>`;
    });

    const colorInfo = percentages.map((percentage) => {
      return `
        <li>
          <span class="impact-color-info" style="background-color: ${
            percentage.color
          }"></span>
          ${percentage.type}, <strong>${percentage.value.toFixed(2)}%</strong>
        </li>
      `;
    });

    return `
      <p>Branch: <strong>${branchName}</strong></p>
      <p>Total usage: <strong>${renderPercentage(
        percentageFormatted,
        total
      )}</strong></p>
      ${renderDifference(data)}

      <div class="impact-progress-bar"> 
        ${progressBarItem.join("")}
      </div>

      <ul style="list-style: none; padding: 0; margin: 4px 0;">
        ${colorInfo.join("")}
      </ul>
    `;
  }

  function renderDifference(data) {
    const {
      currentBranchDifference: { bytes, percentageFormatted },
    } = data;

    let message = "No difference";

    if (bytes !== 0) {
      message = renderPercentage(percentageFormatted, bytes);
    }

    return `
      <p>Difference from main: <strong>${message}</strong></p>
    `;
  }

  function renderPercentage(percentage, bytes) {
    const kbytes = new Number(bytes / 1024).toFixed(2);

    return `${percentage}% (${kbytes} kb)`;
  }

  const percentageFor = (base) => (value) => (value * 100) / base;
})();
