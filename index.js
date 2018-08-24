'use strict';

const STORE = {
    items: [
        {name: "apples", checked: false},
        {name: "oranges", checked: false},
        {name: "milk", checked: false},
        {name: "bread", checked: false}
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
    let renderView = [...STORE.itemView];
    if(!STORE.showChecked) {
        renderView = renderView.filter(item => item.checked === false);
    }

    const storeHtml = renderView.map((item, index) =>
        generateListElementBlock(item, index))
        .join('');
    $('.js-shopping-list').html(storeHtml);

    console.log("items that should be rendered: " + renderView.map(item => item.name).join(', '));
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
        let index = $(this).closest('.js-item-index-element').attr('data-item-index');
        // TODO: this doesn't work. WHY???
        // let index = findIndex(this);
        let item = STORE.items[index];
        STORE.items[index].checked = !STORE.items[index].checked;
        // console.log("hide " + STORE.items[index].name + " at index " + index);
        renderHtml();
    },

    handleDelete: function (event) {
        let index = findIndex(this);
        index = findIndex(this);
        STORE.items.splice(index, 1);
        renderHtml();
    },

    handleEdit: function(event) {
        console.log("edit button clicked");
    },

    handleItemVisibility: function(event) {
        let isChecked = $(this).is(":checked");
        STORE.showChecked = isChecked;
        console.log('show all items: ' + isChecked);
        renderHtml();
    }

}

function findIndex(item) {
   $(this).closest('.js-item-index-element').attr('data-item-index');
}

function bindEventHandlers() {
    $('#js-shopping-list-form').submit(handlers.handleItemAdded);
    $('#checkbox-show-checked').change(handlers.handleItemVisibility);
    $('.js-shopping-list').on('click', '.shopping-item-toggle', handlers.handleToggle);
    $('.js-shopping-list').on('click', '.shopping-item-delete', handlers.handleDelete);
    $('.js-shopping-list').on('click', 'shopping-item-edit', handlers.handleEdit);
}

function main() {
    bindEventHandlers();
    renderHtml();
}

$(main);