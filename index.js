'use strict';

const STORE = {
    items: [
        {name: "apples", checked: false, edit: false},
        {name: "oranges", checked: false, edit: false},
        {name: "milk", checked: false, edit: false},
        {name: "bread", checked: false, edit:false}
    ],

    searchFilter: '',
    showChecked: false
};

// holds a sorted view of items
STORE.itemView = STORE.items

// put edit button to the riht of the element name?
function generateListElementBlock(item, index) {
    let checkedStyle = item.checked ? 'shopping-item__checked' : '';
    let itemContent = item.name;
    if(item.edit) {
        itemContent = `<input type="text" class="name-edit-field" value="${item.name}">`;
    }
    return `<li class="js-item-index-element"
        data-item-index="${index}">
        <span class="shopping-item ${checkedStyle}">${itemContent}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
            <span class="button-label">delete</span>
          </button>
          <button class="shopping-item-edit">
            <span class="button-label">edit</span>
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

    // TODO refactor later
    handleEditEntry: function(event) {
        let index = $(this).closest('.js-item-index-element').attr('data-item-index');
        STORE.items[index].edit = !STORE.items[index].edit;
        if(!STORE.items[index].edit) {
            STORE.items[index].name = $(this).closest('.js-item-index-element').find('.name-edit-field').val();
        }
        renderHtml();
    },

    handleExitEntry: function(event) {
        console.log('lost focus');
    },

    handleItemVisibility: function(event) {
        let isChecked = $(this).is(":checked");
        STORE.showChecked = isChecked;
        console.log('show all items: ' + isChecked);
        renderHtml();
    },

    handleSearch: function(event) {
        STORE.searchFilter = this.val();
        renderHtml();
    }

}

function findIndex(item) {
   $(this).closest('.js-item-index-element').attr('data-item-index');
}

function bindEventHandlers() {
    $('#js-shopping-list-form').submit(handlers.handleItemAdded);
    $('#checkbox-show-checked').change(handlers.handleItemVisibility);
    // $('#text-search').change(handleS);
    $('.js-shopping-list').on('click', '.shopping-item-edit', handlers.handleEditEntry);
    // $('.js-shopping-list').on('focusout', '.shopping-item-edit', handlers.handleEditExit);
    $('.js-shopping-list').on('click', '.shopping-item-toggle', handlers.handleToggle);
    $('.js-shopping-list').on('click', '.shopping-item-delete', handlers.handleDelete);

}

function main() {
    bindEventHandlers();
    renderHtml();
}

$(main);