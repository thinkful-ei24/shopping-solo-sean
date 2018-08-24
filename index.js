'use strict';

const STORE = {
    items: [
        {id: cuid(), name: "apples", checked: false},
        {id: cuid(), name: "oranges", checked: false},
        {id: cuid(), name: "milk", checked: false},
        {id: cuid(), name: "bread", checked: false}
    ],

    showChecked: false,
    // holds a sorted view of items
    itemView: items
};

// i want the edit button and time in a span to the right of the name
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
    let items
    if(STORE.showChecked) {
        items = STORE.items;
    } else {
        items = STORE.items.filter(item => item.checked === false);
    }

    const storeHtml = items.map((item, index) => generateHtml(item, index))
        .join('');
    $('.js-shopping-list').html(storeHtml);

    console.log(STORE.items);
}

const handlers = {

    handleItemAdded: function(event) {
        event.preventDefault();
        const textField = $('.js-shopping-list-entry');
        let name = textField.val();
        textField.val("");
        STORE.items.push({
            name,
            checked: false});
        renderHtml();
    },

    handleToggle: function(event) {
        const index = $(this).parents('.js-item-index-element').attr('data-item-index');
        STORE.items[index].checked = !STORE.items[index].checked;
        console.log("hide " + STORE.items[index].name + " at index " + index);
        renderHtml();
    },

    handleDelete: function (event) {
        const index = $(this).parents('.js-item-index-element').attr('data-item-index');
        STORE.items.splice(index, 1);
        renderHtml();
    },

    handleEdit: function(event) {
        console.log("edit button clicked");
    },

    handleItemHiding: function(event) {
        let isChecked = $(this).is(":checked");
        STORE.showChecked = isChecked;
        console.log('show all items: ' + isChecked);
        renderHtml();
    }

}

function bindEventHandlers() {
    $('#js-shopping-list-form').submit(handlers.handleItemAdded);
    $('#checkbox-show-checked').change(handlers.handleItemHiding);
    $('.js-shopping-list').on('click', '.shopping-item-toggle', handlers.handleToggle);
    $('.js-shopping-list').on('click', '.shopping-item-delete', handlers.handleDelete);
    $('.js-shopping-list').on('click', 'shopping-item-edit', handlers.handleEdit);
}

function main() {
    bindEventHandlers();
    renderHtml();
}

$(main);