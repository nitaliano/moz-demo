define(function (require) {
  return require('backbone').View.extend({
    events: {
      'click .search-btn': 'onSearchBtnClick',
      'keyup .search-input': 'onSearchInputKeyup'
    },

    initialize: function () {
      this._enterKeyCode = 13;
      this.$input = this.$el.find('.search-input');
    },

    onSearchInputKeyup: function (e) {
      if (e.keyCode === this._enterKeyCode) {
        this._submit();
      }
    },

    onSearchBtnClick: function () {
      this._submit();
    },

    _submit: function () {
      var val = this.$input.val();

      if (val === this.model.get('target')) {
        this.model.trigger('change:target'); // force target change event
        return;
      }

      this.model.set('target', val);
    }
  });
});