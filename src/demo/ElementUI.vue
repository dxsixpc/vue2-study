<template>
  <div id="element-ui-container">
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary" icon="el-icon-search">主要按钮 搜索</el-button>
      <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
        <el-button type="primary">
          下一页<i class="el-icon-arrow-right el-icon--right"> </i
        ></el-button>
      </el-button-group>
    </el-row>
    <el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>
    <el-row>
      <el-radio v-model="radio" label="1">备选项</el-radio>
      <el-radio v-model="radio" label="2">备选项</el-radio>
    </el-row>
    <el-date-picker
      v-model="value2"
      align="right"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            },
          },
        ],
      },
      value1: '',
      value2: '',
      radio: '1',
    };
  },
};
</script>
