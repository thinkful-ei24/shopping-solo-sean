'use strict';

const STORE = {
    items: [
        {id: 5, name: "apples", checked: false},
        {id: 7, name: "oranges", checked: false},
        {id: 9, name: "milk", checked: false},
        {id: 10, name: "bread", checked: false}
    ],

    showChecked: false
};

// holds a sorted view of items
STORE.itemView = STORE.items

// i want the edit button and time in a span to the right of the name
function generateListElementBlock(item, index) {
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
    let allItems = STORE.itemView;
    let renderedItems;
    if(STORE.showChecked) {
        renderedItems = allItems;
    } else {
        renderedItems = allItems.filter(item => item.checked === false);
    }

    const storeHtml = renderedItems.map((item, index) =>
        generateListElementBlock(item, index))
        .join('');
    $('.js-shopping-list').html(storeHtml);

    console.log("items that should be rendered: " + renderedItems.map(item => item.name).join(', '));
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
        const index = $(this).id;
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

function findElement(id) {
   return STORE.items.find(item => item.id === id);
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