<template>
  <div class="float-right ml-1">
    <b-button v-b-modal.modal-link-access class="btn btn-primary"
    @click="generateAccessLink()"
      >Gerar link acesso
    </b-button>

    <b-modal id="modal-link-access" title="Novo todo" hide-footer>
      <form>
        <label for="inputEmail" class="sr-only">Todo</label>
        <input
          v-model="accessLink"
          type="text"
          id="inputTodo"
          class="form-control mb-1"
          placeholder="Typing todo"
          autofocus="true"
        />
        <select class="form-control" v-model="permission">
            <option value="">Selecionar um nível de acesso</option>
            <option value="read">read</option>
            <option value="write">write</option>

        </select>
        <br />
        <button class="btn btn-danger" @click="$bvModal.hide('modal-link-access')">
          Cancelar</button
        >&nbsp;
        <button class="btn btn-primary" @click="saveAccessLinkGenereated()">
          Gerar</button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import UuidUtil from "../../utils/UuidUtil";
import APP from "../../constants/App";
import linkAccessService from "../../services/LinkAccessService";

export default {
    name: "LinkAccess",
    data() {
        return {
            accessLink: "",
            permission: ""
        }
    },
    methods: {
        async saveAccessLinkGenereated() {
            const userId = localStorage.getItem(APP.LOCALSTORAGE.USER_ID);   
            await linkAccessService.insert({
                link: this.accessLink,
                permission: this.permission,
                user_id: userId
            });
            this.$bvModal.hide('modal-link-access');
            this.accessLink = "";
            this.permission = "";
        },
        generateAccessLink() {
            this.accessLink = `${process.env.VUE_APP_URL_APP}/${UuidUtil.get()}`;
        }
    }
};
</script>

