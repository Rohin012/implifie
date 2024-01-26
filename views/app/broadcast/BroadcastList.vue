<template>
    <div>
        <Card bodyClass="p-3 mb-3">
            <GridSkeltion :count="2" v-if="isGridSkeltion" />
            <Statistics v-if="!isGridSkeltion" />
        </Card>

        <SimpleBar class="h-[60vh]">
            <TableSkeltion :count="5" v-if="isTableSkeltion" />
            <vue-good-table :columns="columns" styleClass=" vgt-table v-middle lesspadding2 listview "
                :rows="this.broadcasts" :pagination-options="{
                    enabled: true,
                    perPage: perpage,
                }" max-height="55vh" :fixed-header="true" :sort-options="{
                    enabled: false,
                }" v-if="!isTableSkeltion">

                <template v-slot:table-row="props">
                    <span v-if="props.column.field == 'no'" class="block w-4">
                        {{ props.row.no }}
                    </span>
                    <span v-if="props.column.field == 'broadcast_name'">
                        <span class="text-sm leading-4 items-center text-left">
                            {{
                                props.row.broadcast_name.length > 40
                                ? props.row.broadcast_name.substring(0, 40) + "..."
                                : props.row.broadcast_name
                            }}
                        </span>
                    </span>

                    <span v-if="props.column.field == 'status'" class="block w-8 text-xs">
                        <span
                            class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-slate-500 bg-slate-500"
                            v-if="props.row.status === '0'">Not Started</span>
                        <span
                            class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-success-500 bg-success-500"
                            v-if="props.row.status === '1'">Active</span>
                        <span
                            class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-info-500 bg-info-500"
                            v-if="props.row.status === '2'">Paused</span>
                        <span
                            class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-danger-500 bg-danger-500"
                            v-if="props.row.status === '3'">Error</span>
                        <span
                            class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-warning-500 bg-warning-500"
                            v-if="props.row.status === '4'">Stopped</span>
                    </span>
                    <span v-if="props.column.field == 'action'" class="block grid grid-cols-3 gap-4">
                        <div class="space-x-3 mr-2">
                            <Button text="Start" btnClass="btn-sm btn-primary w-20 "
                                v-if="props.row.status === '0' || props.row.status === '4'" />
                            <Button text="Pause" btnClass="btn-sm btn-success w-20" v-if="props.row.status === '1'" />
                            <Button text="Continue" btnClass="btn-sm btn-info w-20"
                                v-if="props.row.status === '2' || props.row.status === '3'" />
                        </div>
                        <div class="space-x-3 mr-2">
                            <Button text="Stop" btnClass="btn-sm btn-danger w-20"
                                v-if="props.row.status === '1' || props.row.status === '2' || props.row.status === '3'" />
                        </div>
                        <div class="space-x-3 my-2">
                            <Tooltip placement="top" arrow theme="dark" btnClass="my-3">
                                <template #button>
                                    <div class="action-btn">
                                        <Icon icon="heroicons:eye" />
                                    </div>
                                </template>
                                <span> View</span>
                            </Tooltip>
                            <Tooltip placement="top" arrow theme="dark" btnClass="my-2">
                                <template #button>
                                    <div class="action-btn">
                                        <Icon icon="heroicons:pencil-square" />
                                    </div>
                                </template>
                                <span> Edit</span>
                            </Tooltip>
                            <Tooltip placement="top" arrow theme="danger-500">
                                <template #button>
                                    <div class="action-btn">
                                        <Icon icon="heroicons:trash" />
                                    </div>
                                </template>
                                <span>Delete</span>
                            </Tooltip>
                        </div>
                    </span>
                </template>

                <template #pagination-bottom="props">
                    <div class="py-3 px-3 justify-center flex bg-white">
                        <Pagination :total="broadcasts.length" :current="current" :per-page="perpage" :pageRange="pageRange"
                            @page-changed="current = $event" :pageChanged="props.pageChanged"
                            :perPageChanged="props.perPageChanged" />
                    </div>
                </template>
            </vue-good-table>
        </SimpleBar>
    </div>
</template>

<script>
import Card from "@/components/Card";
import Dropdown from "@/components/Dropdown";
import Icon from "@/components/Icon";
import Tooltip from "@/components/Tooltip";
import Pagination from "@/components/Pagination";
import Button from "@/components/Button";
import { MenuItem } from "@headlessui/vue";
import { mapState, mapActions } from "pinia";
import { useProjectStore } from "@/store/project";
import Statistics from "./BroadcastStats.vue";
import TableSkeltion from "@/components/Skeleton/Table";
import GridSkeltion from "@/components/Skeleton/Project-grid";
import { ref } from "vue";

export default {
    components: {
        Pagination,
        Dropdown,
        Icon,
        MenuItem,
        Tooltip,
        Card,
        Button,
        TableSkeltion,
        GridSkeltion,
        Statistics,
    },

    data() {
        return {
            current: 1,
            perpage: 5,
            pageRange: 10,
            isGridSkeltion: false,
            isTableSkeltion: false,
            actions: [
                {
                    name: "View",
                    icon: "heroicons:eye",
                    doit: () => {
                        this.$router.push({ name: "project-details" });
                    },
                },
                {
                    name: "Edit",
                    icon: "heroicons:pencil-square",
                    doit: (data) => {
                        this.updateProject(data);
                    },
                },
                {
                    name: "Delete",
                    icon: "heroicons-outline:trash",
                    doit: (data) => {
                        this.removeProject(data)
                    },
                },
            ],

            columns: [
                {
                    label: "No.",
                    field: "no",
                    width: "50px",
                },
                {
                    label: "Broadcast Name",
                    field: "broadcast_name",
                    width: "280px",
                },

                {
                    label: "Status",
                    field: "status",
                    width: "90px",
                },
                {
                    label: "Category",
                    field: "category",
                    width: "80px",
                },

                {
                    label: "Sent",
                    field: "sent",
                    width: "70px",
                },
                {
                    label: "Delivered",
                    field: "delivered",
                    width: "70px",
                },
                {
                    label: "Read",
                    field: "read",
                    width: "70px",
                },

                {
                    label: "Replied",
                    field: "replied",
                    width: "70px",
                },
                {
                    label: "Errored",
                    field: "errored",
                    width: "70px",
                },
                {
                    label: "Actions",
                    field: "action",
                    width: "300px",
                },
            ],

            broadcasts: [
                {
                    no: "1",
                    broadcast_name: "Management Dashboard Dashboard Dashboard Dashboard",
                    category: "Utility",
                    status: "0",
                    sent: "100",
                    delivered: "80",
                    read: "40",
                    replied: "10",
                    errored: "20",
                },
                {
                    no: "2",
                    broadcast_name: "Management Dashboard Dashboard Dashboard",
                    category: "Marketing",
                    status: "1",
                    sent: "100",
                    delivered: "80",
                    read: "40",
                    replied: "10",
                    errored: "20",
                },
                {
                    no: "3",
                    broadcast_name: "Management Dashboard Dashboard",
                    category: "Utility",
                    status: "2",
                    sent: "100",
                    delivered: "80",
                    read: "40",
                    replied: "10",
                    errored: "20",
                },
                {
                    no: "4",
                    broadcast_name: "Management Dashboard ",
                    category: "Marketing",
                    status: "3",
                    sent: "100",
                    delivered: "80",
                    read: "40",
                    replied: "10",
                    errored: "20",
                },
                {
                    no: "5",
                    broadcast_name: "Management Dashboard ",
                    category: "Utility",
                    status: "4",
                    sent: "100",
                    delivered: "80",
                    read: "40",
                    replied: "10",
                    errored: "20",
                },
                {
                    no: "6",
                    broadcast_name: "Management Dashboard ",
                    category: "Marketing",
                    status: "1",
                    sent: "100",
                    delivered: "80",
                    read: "40",
                    replied: "10",
                    errored: "20",
                },
                {
                    no: "7",
                    broadcast_name: "Management Dashboard ",
                    category: "Utility",
                    status: "2",
                    sent: "100",
                    delivered: "80",
                    read: "40",
                    replied: "10",
                    errored: "20",
                },
                {
                    no: "8",
                    broadcast_name: "Management Dashboard ",
                    category: "Marketing",
                    status: "3",
                    sent: "100",
                    delivered: "80",
                    read: "40",
                    replied: "10",
                    errored: "20",
                },
                {
                    no: "9",
                    broadcast_name: "Management Dashboard ",
                    category: "Utility",
                    status: "4",
                    sent: "100",
                    delivered: "80",
                    read: "40",
                    replied: "10",
                    errored: "20",
                },
                {
                    no: "10",
                    broadcast_name: "Management Dashboard ",
                    category: "Marketing",
                    status: "1",
                    sent: "100",
                    delivered: "80",
                    read: "40",
                    replied: "10",
                    errored: "20",
                },
                {
                    no: "11",
                    broadcast_name: "Management Dashboard ",
                    category: "Utility",
                    status: "2",
                    sent: "100",
                    delivered: "80",
                    read: "40",
                    replied: "10",
                    errored: "20",
                },
                {
                    no: "12",
                    broadcast_name: "Management Dashboard ",
                    category: "Marketing",
                    status: "3",
                    sent: "100",
                    delivered: "80",
                    read: "40",
                    replied: "10",
                    errored: "20",
                },
                {
                    no: "13",
                    broadcast_name: "Management Dashboard ",
                    category: "Utility",
                    status: "4",
                    sent: "100",
                    delivered: "80",
                    read: "40",
                    replied: "10",
                    errored: "20",
                },

            ],
        };
    },
    methods: {
        ...mapActions(useProjectStore, ['updateProject', 'removeProject'])
    }
};
</script>
<style lang="scss">
.listview {
    th {
        @apply last:text-end;
    }
}
</style>