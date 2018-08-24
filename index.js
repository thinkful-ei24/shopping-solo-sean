'use strict';

const STORE = [{
        name: "apples",
        checked: false
    },
    {
        name: "oranges",
        checked: false
    },
    {
        name: "milk",
        checked: true
    },
    {
        name: "bread",
        checked: false
    }
];

function generateHtml(item, index) {
    let checkedStyle = item.checked ? 'shopping-item__checked' : '';
    return `<li class="js-item-index-element"
        data-item-index="${index}">
        <span class="shopping-item ${checkedStyle}">${item.name}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`;
}

function renderHtml() {
    const storeHtml = STORE.map((item, index) => generateHtml(item, index)).join('');
    $('.js-shopping-list').html(storeHtml);
}

const handlers = {

    handleItemAdded: function(event) {
        event.preventDefault();
        const textField = $('.js-shopping-list-entry');
        let name = textField.val();
        textField.val("");
        STORE.push({
            name,
            checked: false});
        renderHtml();
    },

    handleToggle: function(event) {
        const index = $(this).parents('.js-item-index-element').attr('data-item-index');
        STORE[index].checked = !STORE[index].checked;
        renderHtml();
    },

    handleDelete: function (event) {
        const index = $(this).parents('.js-item-index-element').attr('data-item-index');
        STORE.splice(index, 1);
        renderHtml();
    }

}

function bindEventHandlers() {
    $('#js-shopping-list-form').submit(handlers.handleItemAdded);
    $('.js-shopping-list').on('click', '.shopping-item-toggle', handlers.handleToggle);
    $('.js-shopping-list').on('click', '.shopping-item-delete', handlers.handleDelete);
}

function main() {
    bindEventHandlers();
    renderHtml();
}

$(main);