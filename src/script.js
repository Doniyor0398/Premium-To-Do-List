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
  }

  getItemFromLocalStorage() {
    const rawData = localStorage.getItem(this.localStorageKey);
    if (!rawData) {
      return [];
    }

    try {
    } catch (error) {}
  }
}

new Todo();
