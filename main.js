const state = {
  timersNode: document.querySelector("#timers"),
  addTimerForm: document.querySelector("#add-timer-form"),
  timeInput: document.querySelector("#time-input"),
};

function createTimer(initialTime) {
  let restTime = initialTime;

  const timerItemNode = document.createElement("li");
  const textNode = document.createElement("p");
  const removeButton = document.createElement("button");

  textNode.textContent = restTime;
  removeButton.textContent = 'Удалить';
  removeButton.addEventListener("click", () =>
    removeTimer(intervalId, timerItemNode)
  );
  timerItemNode.append(removeButton);
  timerItemNode.append(textNode);

  state.timersNode.append(timerItemNode);

  const intervalId = setInterval(() => {
    restTime -= 1;
    textNode.textContent = restTime;
    if (!restTime) {
      removeTimer(intervalId, timerItemNode);
    }
  }, 1000);
}

function removeTimer(intervalId, node) {
  clearInterval(intervalId);
  node.remove();
}

function isValid(value) {
  return !value || /^[1-9]\d*$/.test(value);
}

function init() {
  state.timeInput.addEventListener("input", (event) => {
    const value = event.target.value;
    if (isValid(value)) {
      event.target.classList.remove("error");
    } else {
      event.target.classList.add("error");
    }
  });

  state.addTimerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = state.timeInput.value;
    if (value && isValid(value)) {
      createTimer(parseInt(value));
      event.target.reset();
    }
  });
}

init();