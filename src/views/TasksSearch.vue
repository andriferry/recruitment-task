<template>
  <main>
    <h1>Tasks Search view</h1>

    <div class="container">
      <div class="search">
        <input type="text" />
      </div>
      <table class="tasks">
        <tr>
          <th>Title</th>
          <th>
            Description
          </th>
          <th>
            Budget
          </th>
          <th>
            Propsal Count
          </th>
          <th>
            Platform
          </th>
        </tr>

        <tr v-for="data in 6" :key="data">
          <td>Title</td>
          <td>
            Description
          </td>
          <td>
            Budget
          </td>
          <td>
            Propsal Count
          </td>
          <td>
            Platform
          </td>
        </tr>
      </table>

      <div class="pagination">
        <a href="#">Previous</a>
        <a href="#" v-for="data in 3" :key="data">
          {{ data }}
        </a>
        <a href="#">Next</a>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from "vue";

  import useTaskSearch from "@/components/task-search/tasks-search";

  export default defineComponent({
    name: "TasksSearch",

    setup() {
      const Task = useTaskSearch();
      onMounted(() => {
        Task.getTasks().then((res) => {
          console.log(res);
        });
      });

      return {};
    },

    // {
    // params: {
    //   ID: 12345
    // }
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
      justify-content: end;
      padding: 15px 5px;
      a {
        margin: 0px 5px;
      }
    }
  }
</style>
