

export default {
  data() {
    return {
      queryform_form: {},
      queryform_module: {}
    };
  },
  created() {
    this.init_queryform();
  },

  methods: {
    init_queryform() {
      this.reset_queryform();
    },
    tosearch_queryform() {},
    reset_queryform() {
      this.queryform_form = {};
      this.queryform_form = this.$lodash.cloneDeep(this["queryform_module"]);
    }
  }
};
