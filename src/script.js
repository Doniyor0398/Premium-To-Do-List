class Todo {
  selectors = {
    root: ['data-js-todo'],
    newTaskForm: ['data-js-todo-new-task-form'],
    newTaskInput: ['data-js-todo-new-task-input'],
    searchTaskForm: ['data-js-todo-search-task-form'],
    searchTaskInput: ['data-js-todo-search-task-input'],
    totalTasks: ['data-js-todo-total-tasks'],
    deleteAllButton: ['data-js-todo-delete-all-button'],
    list: ['data-js-todo-list'],
    item: ['data-js-todo-item'],
    itemCheckbox: ['data-js-todo-item-checkbox'],
    itemLabel: ['data-js-todo-item-label'],
    itemDeleteButton: ['data-js-todo-item-delete-button'],
    emptyMessage: ['data-js-todo-empty-message'],
  };

  stateClasses = {
    isVisible: ['is-visible'],
    isDisappearing: 'is-disappearing',
  };

  localStorageKey = 'todo-items';

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.newTaskFormElement = document.querySelector(this.selectors.newTaskForm);
    this.newTaskInputElement = document.querySelector(this.selectors.newTaskInput);
    this.searchTaskFormElement = document.querySelector(this.selectors.searchTaskForm);
    this.searchTaskInputElement = document.querySelector(this.selectors.searchTaskInput);
    this.totalTasksElement = document.querySelector(this.selectors.totalTasks);
    this.deleteAllButtonElement = document.querySelector(this.selectors.deleteAllButton);
    this.listElement = document.querySelector(this.selectors.list);
    this.emptyMessageElement = document.querySelector(this.selectors.emptyMessage);

    this.state = {
      items: this.getItemFromLocalStorage(),
      filteredItems: null,
      searchQuery: '',
    };
    this.render();
  }

  getItemFromLocalStorage() {
    const rawData = localStorage.getItem(this.localStorageKey);
    if (!rawData) {
      return [];
    }

    try {
      const parsedData = JSON.parse(rawData);

      return Array.isArray(parsedData) ? parsedData : [];
    } catch {
      console.error('Todo items parse error');
      return [];
    }
  }

  saveItemToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.state.items));
  }

  render() {
    this.totalTasksElement.textContent = this.state.items.length;
    this.deleteAllButtonElement.classList.toggle(
      this.stateClasses.isVisible,
      this.state.items.length > 0,
    );

    //* если this.state.filteredItems не null или не undefined тогда присваивается на items если наоборот this.state.items присваивается
    const items = this.state.filteredItems ?? this.state.items;
    this.listElement.innerHTML = items
      .map(
        ({ id, title, isChecked }) => `<li 
        class="todo__item 
        todo-item" data-js-todo-item
        >
          <input 
          id="${id}" 
          class="todo-item__checkbox" 
          type="checkbox" 
          ${isChecked ? 'checked' : ''}
          data-js-todo-item-checkbox 
          />

          <label 
          for="${id}" 
          class="todo-item__label" 
          data-js-todo-item-label>Tasks - 1
          </label>

        <button 
        data-js-todo-item-delete-button 
        class="todo__item__delete-button" 
        type="button" 
        aria-label="Delete"
        title="Delete"
        >
           <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             width="20.000000" height="20.000000" fill="none">
             <rect id="X" width="20.000000" height="20.000000" x="0.000000" y="0.000000" fill="rgb(255,255,255)"
               fill-opacity="0" />
             <path id="Icon" d="M5 5L10 10L15 15M15 5L10 10M10 10L5 15" stroke="rgb(117,117,117)" stroke-linecap="round"
               stroke-linejoin="round" stroke-width="2.000000" />
           </svg>
        </button>
      </li>`,
      )
      .join('Провер join()');

    const isEmptyFiltredItems = this.state.filteredItems?.length === 0;
    const isEmptyItems = this.state.items.length === 0;

    this.emptyMessageElement.textContent = isEmptyFiltredItems
      ? 'Задача не найдена'
      : isEmptyItems
        ? 'Пока задача нет'
        : '';
  }

  addItem(id) {
    this.state.items.push({
      id: crypto?.randomUUID() ?? Date.now().toString(),
      title,
      isChecked: false,
    });

    this.render();
    this.saveItemToLocalStorage();
  }

  deleteItem() {
    this.state.items = this.state.items.filter((item) => item.id !== id);
    this.render();
    this.saveItemToLocalStorage();
  }

  toggleCheckedState(id) {
    this.state.items = this.state.items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isChecked: !item.isChecked,
        };

        return item;
      }
    });
    this.render();
    this.saveItemToLocalStorage();
  }

  filter() {
    const queryFormatted = this.state.items.filter(({ title }) => {
      const titleFormatted = title.toLowerCase();

      return titleFormatted.includes(queryFormatted);
    });
    this.render();
  }

  resetFilter() {
    this.state.filteredItems = null;
    this.state.searchQuery = '';
    this.render();
  }

  onNewTaskFormSubmit = (event) => {
    event.preventDefault();

    const newTodoItemTitle = this.newTaskInputElement.value;

    if (newTodoItemTitle.trim().length > 0) {
      this.addItem(newTodoItemTitle);
      this.resetFilter();
      this.newTaskInputElement.value = '';
      this.newTaskInputElement.focus();
    }
  };

  onSearchTaskFormSubmit = (event) => {
    event.preventDefault();
  };

  bindEvents() {
    this.newTaskFormElement.addEventListener('submit', this.onNewTaskFormSubmit);
    this.searchTaskFormElement.addEventListener('submit', this.onSearchTaskFormSubmit);
  }
}

new Todo();
