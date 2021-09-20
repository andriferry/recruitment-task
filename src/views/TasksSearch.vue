<template>
  <main>
    <h1>Tasks Search view</h1>
    <div class="container">
      <div class="search">
        <div class="input">
          <label for="">Sort Budget</label>
          <select>
            <option value="selected">Selected</option>
            <option value="min">Min</option>
            <option value="max">Max</option>
          </select>
        </div>
        <div class="input">
          <label for="">Platform</label>
          <select>
            <option>all</option>
          </select>
        </div>
        <div class="input">
          <label for="">Search</label>
          <input type="text" />
        </div>
        <button>Submit</button>
      </div>

      <table class="tasks">
        <tr>
          <th v-for="(dataTable, index) in table" :key="index">
            {{ dataTable }}
          </th>
        </tr>

        <tr>
          <td v-text="'data.title'"></td>
          <td v-text="'data.description'"></td>
          <td>
            Budget
          </td>
          <td v-text="'data.proposalCount'"></td>
          <td>
            <ul>
              <li>
                platform
              </li>
            </ul>
          </td>
          <td v-text="'data.addedTime'"></td>
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

    return {
      table,
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
