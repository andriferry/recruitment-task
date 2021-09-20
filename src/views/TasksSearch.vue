<template>
  <main>
    <h1>Tasks Search view</h1>
    <div class="container">
      <div class="search">
        <div class="input">
          <label for="">Greater Budget</label>
          <input v-model="params.budgetGreaterEqual" type="text" />
        </div>
        <div class="input">
          <label for="">Budget Lower</label>
          <input v-model="params.budgetLowerEqual" type="text" />
        </div>
        <div class="input">
          <label for="">Platform</label>
          <select>
            <option>all</option>
          </select>
        </div>
        <div class="input">
          <label for="">Search</label>
          <input v-model="params.keywords" type="text" />
        </div>
        <button>Submit</button>
      </div>

      <table class="tasks">
        <tr>
          <th v-for="(dataTable, index) in table" :key="index">
            {{ dataTable }}
          </th>
        </tr>

        <tr v-for="(data, index) in tasks" :key="index">
          <td v-text="data.title"></td>
          <td v-text="data.description"></td>
          <td>
            Budget
          </td>
          <td v-text="data.proposalCount"></td>
          <td>
            <ul>
              <li v-for="(data, index) in data.platforms" :key="index">
                {{ data }}
              </li>
            </ul>
          </td>
          <td v-text="data.addedTime"></td>
        </tr>
      </table>

      <div class="pagination">
        thi is pagination
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useTask from '@/components/task-search/tasks-data-model'

export default defineComponent({
  name: 'TasksSearch',

  setup() {
    const table = ref([
      'Title',
      'Description',
      'Budget',
      'Proposal Count',
      'Platform',
      'Added Time',
    ])
    const { params, tasks } = useTask()

    return {
      table,
      params,
      tasks,
    }
  },
})
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100vh;
  padding: 100px;

  .tasks {
    border-collapse: collapse;
    width: 100%;
    tr {
      border: 1px solid black;
      padding: 8px;
      th {
        background-color: #20ceee;
        color: white;
      }
      th,
      td {
        padding: 8px;
        border-right: 1px solid black;
      }
    }
  }
  .pagination,
  .search {
    display: flex;
    justify-content: flex-end;
    padding: 15px 5px;
    a {
      margin: 0px 5px;
    }
    .input {
      margin: 0px 5px;
      label {
        margin-right: 5px;
      }
    }
  }
}
</style>
