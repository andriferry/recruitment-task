<template>
  <main>
    <h1>Tasks Search view</h1>

    <div class="container">
      <div class="search">
        <div class="input">
          <label for="">Greater Budget</label>
          <input
            @keypress.enter="getGreaterBudget(params.budgetGreaterEqual)"
            v-model="params.budgetGreaterEqual"
            type="text"
          />
        </div>
        <button @click="getGreaterBudget(params.budgetGreaterEqual)">
          Submit
        </button>
        <div class="input">
          <label for="">Budget Lower</label>
          <input v-model="params.budgetLowerEqual" type="text" />
          <button>Submit</button>
        </div>
        <div class="input">
          <label for="">Platform</label>
          <select v-model="selectedPlatform">
            <option
              v-for="(data, index) in allPlatforms"
              :key="index"
              :value="customValuePlatform(data)"
            >
              {{ data }}
            </option>
          </select>
        </div>
        <div class="input">
          <label for="">Search</label>
          <input
            @keypress.enter="searchByKeyword(params.keywords)"
            v-model="params.keywords"
            type="text"
          />
        </div>
        <button @click="searchByKeyword(params.keywords)">Submit</button>
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
            {{ formatBudget(data.budget.value, data.budget.currency, 'en-US') }}
          </td>
          <td v-text="data.proposalCount"></td>
          <td>
            <ul>
              <li v-for="(data, index) in data.platforms" :key="index">
                {{ data }}
              </li>
            </ul>
          </td>
          <td>{{ dateFormat(data.addedTime) }}</td>
        </tr>
      </table>

      <div class="pagination">
        thi is pagination
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useTask from '@/components/task-search/tasks-data-model'
import useBudget from '@/controller/budget'
import usePlatform from '@/controller/platforms'
import useHandleRoute from '@/controller/handle-routes'
import fetch from '@/components/task-search/get-taks'

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
    const {
      params,
      tasks,
      allPlatforms,
      selectedPlatform,
      slicingData,
      allTasks,
      dateFormat,
    } = useTask()
    const { queryPlatform, queryKeyword, queryGreaterBudget } = useHandleRoute()
    const { formatBudget, sortGreaterBudget } = useBudget()
    const { customValuePlatform, sortingByPlatform } = usePlatform()
    const { getTasks } = fetch()

    const searchByKeyword = (keyword: string) => {
      getTasks(params).then((res) => {
        tasks.value = res.data.tasks
        queryKeyword(keyword)
      })
    }

    const backToDefault = () => {
      slicingData(allTasks.value)
    }

    const getGreaterBudget = (budget: number) => {
      if (typeof budget == 'undefined') {
        backToDefault()
      } else {
        queryGreaterBudget(budget)
        sortGreaterBudget(params.limit, budget).then((res) => {
          slicingData(res.data.tasks)
        })
      }
    }

    watch(selectedPlatform, (value: string) => {
      if (value == 'other') {
        backToDefault()
      } else {
        queryPlatform(value)
        sortingByPlatform(params.limit, value.toUpperCase()).then((res) => {
          slicingData(res.data.tasks)
        })
      }
    })

    return {
      table,
      params,
      tasks,
      allPlatforms,
      selectedPlatform,
      searchByKeyword,
      formatBudget,
      customValuePlatform,
      dateFormat,
      getGreaterBudget,
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
