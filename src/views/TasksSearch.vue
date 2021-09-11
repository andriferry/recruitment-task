<template>
  <main>
    <h1>Tasks Search view</h1>

    <div class="container" v-if="componentTask.task">
      <div class="search">
        <div class="input">
          <label for="">Sort Budget</label>
          <select v-model="selectedBudget" @change="selectBudget" name="" id="">
            <option value="selected">Selected</option>
            <option value="min">Min</option>
            <option value="max">Max</option>
          </select>
        </div>
        <div class="input">
          <label for="">Platform</label>
          <select
            @change="selectPlatforms"
            v-model="selectedPlatform"
            name=""
            id=""
          >
            <option
              v-for="(platform, index) in componentTask.allPlatform"
              :key="index"
              v-text="platform"
              :value="createdPlatformValue(platform)"
            ></option>
          </select>
        </div>
        <div class="input">
          <label for="">Search</label>
          <input v-model="keyword" type="text" />
        </div>
      </div>

      <table class="tasks">
        <tr>
          <th v-for="(dataTable, index) in table" :key="index">
            {{ dataTable }}
          </th>
        </tr>

        <tr v-for="(data, index) in dataTask" :key="index">
          <td v-text="data.title"></td>
          <td v-text="data.description"></td>
          <td>
            {{ formatBudget(data.budget.value, data.budget.currency, "en-US") }}
          </td>
          <td v-text="data.proposalCount"></td>
          <td>
            <ul>
              <li v-for="(platforms, index) in data.platforms" :key="index">
                {{ platforms }}
              </li>
            </ul>
          </td>
          <td v-text="data.addedTime"></td>
        </tr>
      </table>

      <div class="pagination">
        <a href="#" v-text="'Previous'"></a>

        <router-link
          v-for="data in 3"
          :key="data"
          :to="{ name: 'TaskResult', params: { id: data } }"
          @click="pagination(tasks.length, tasks.length + 3)"
        >
          {{ data }}
        </router-link>
        <a href="#" v-text="'Next'"></a>
      </div>

      this is all data
      <table class="tasks" style="margin-top: 10px">
        <tr>
          <th v-for="(dataTable, index) in table" :key="index">
            {{ dataTable }}
          </th>
        </tr>

        <tr v-for="(data, index) in componentTask.allTasks" :key="index">
          <td v-text="data.title"></td>
          <td v-text="data.description"></td>
          <td>
            {{ formatBudget(data.budget.value, data.budget.currency, "en-US") }}
          </td>
          <td v-text="data.proposalCount"></td>
          <td>
            <ul>
              <li v-for="(platforms, index) in data.platforms" :key="index">
                {{ platforms }}
              </li>
            </ul>
          </td>
          <td v-text="data.addedTime"></td>
        </tr>
      </table>
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";

  import useTaskSearch from "@/components/task-search/tasks-search";

  export default defineComponent({
    name: "TasksSearch",
    setup() {
      const {
        componentTask,
        selectedPlatform,
        selectedBudget,
        keyword,
        dataTask,
        selectPlatforms,
        selectBudget,
        pagination,
        formatBudget,
        createdPlatformValue,
      } = useTaskSearch();

      const table = ref([
        "Title",
        "Description",
        "Budget",
        "Proposal Count",
        "Platform",
        "Added Time",
      ]);

      return {
        table,
        componentTask,
        selectedPlatform,
        selectedBudget,
        keyword,
        dataTask,
        selectPlatforms,
        selectBudget,
        pagination,
        formatBudget,
        createdPlatformValue,
      };
    },
  });
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
