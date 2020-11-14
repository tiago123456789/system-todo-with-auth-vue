<template>
   <Dashboard title="Todos">
    <div class="row">
      <div class="col-12 mb-2">
        <Authorizator :permission="permission" permissionToRender="write">
          <LinkAccess ></LinkAccess>&nbsp;
        </Authorizator>
        <Authorizator :permission="permission" permissionToRender="write">
            <b-button v-b-modal.modal-1 class="btn btn-primary float-right ml-1">Adicionar</b-button>&nbsp;
        </Authorizator>
      </div>
      <b-modal id="modal-1" title="Novo todo" hide-footer>
        <form>
          <label for="inputEmail" class="sr-only">Todo</label>
          <input
            v-model="newTask.name"
            type="text"
            id="inputTodo"
            class="form-control mb-1"
            placeholder="Typing todo"
            autofocus="true"
          />
          <br/>
          <button class="btn btn-danger" @click="$bvModal.hide('modal-1')">Cancelar</button>&nbsp;
          <button class="btn btn-primary" @click="submitNewTask()">Salvar</button>
        </form>
      </b-modal>
      <div class="col-4">
        <h3 class="col-8 ml-2">Todo</h3>
        <draggable
          class="list-group border_column"
          :list="tasks.todo"
          group="people"
          @change="(event) => handler(event, 'todo')"
        >
          <div
            class="list-group-item"
            v-for="element in tasks.todo"
            :key="element.id"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>
      <div class="col-4">
        <h3 class="col-8 ml-2">In progressing</h3>
        <draggable
          class="list-group border_column"
          :list="tasks.inProgressing"
          group="people"
          @change="(event) => handler(event, 'inProgressing')"
        >
          <div
            class="list-group-item"
            v-for="(element) in tasks.inProgressing"
            :key="element.id"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>
      <div class="col-4">
        <h3 class="col-8 ml-2">Done</h3>
        <draggable
          class="list-group border_column"
          :list="tasks.done"
          group="people"
          @change="(event) => handler(event, 'done')"
        >
          <div
            class="list-group-item"
            v-for="(element) in tasks.done"
            :key="element.id"
          >
            {{ element.name }} 
          </div>
        </draggable>
      </div>
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from "../template/Dashboard";
import draggable from "vuedraggable";
import todoService from "../../services/TodoService";
import linkAcessService from "../../services/LinkAccessService";
import APP from "../../constants/App";
import LinkAccess from "../todo/LinkAccess.vue";
import Authorizator from "../auth/Authorizator";
import Permission from "../../models/Permission";

export default {
  name: "TodoList",
  components: {
    draggable, Dashboard, LinkAccess, 
    Authorizator,
  },
  data() {
    return {
      newTask: {
        name: "",
        type: "todo",
      },
      tasks: {
        todo: [],
        inProgressing: [],
        done: [],
      },
      permission: null
    };
  },
  async beforeMount() {
    let link = this.$route.params.link;
    if (link) {
      link = `${process.env.VUE_APP_URL_APP}/${link}`;
      const accessLink = await linkAcessService.getByLink(link);
      localStorage.setItem(APP.LOCALSTORAGE.USER_ID, accessLink.user_id);
      this.permission = accessLink.permission;
    } else {
      this.permission = Permission.WRITE;
    }
    const todos = await todoService.getAllByUserId(
      localStorage.getItem(APP.LOCALSTORAGE.USER_ID)
    );
    todos.forEach((todo) => {
      this.tasks[todo.type].push(todo);
    });
  },
  methods: {
    async submitNewTask() {
      const userId = localStorage.getItem(APP.LOCALSTORAGE.USER_ID);
      const docId = await todoService.insert({
        ...this.newTask,
        user_id: userId,
      });
      this.tasks.todo.push({
        ...this.newTask,
        user_id: userId, id: docId
      });
      this.newTask.name = "";
      this.$bvModal.hide("modal-1");
    },
    async handler(evt, type) {
      const isEventAdded = Object.keys(evt)[0] == "added";
      if (isEventAdded) {
        await todoService.update(evt.added.element.id, { type });
      }
    },
  },
};
</script>

<style scoped>
</style>