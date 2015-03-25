define(function (require) {
  return require('backbone').View.extend({
    template: Handlebars.templates._items,
    initTemplate: Handlebars.templates._init_results,
    noDataTemplate: Handlebars.templates._no_results,

    initialize: function () {
      this.$content = this.$el.find('.results-content');
      this.$content.html(this.initTemplate());
    },

    render: function (results) {
      this.$content.html(results.length === 0 ? this.noDataTemplate() : this.template(results));
    }
  });
});