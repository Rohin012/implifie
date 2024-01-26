<template>
    <div>
        <div class="grid grid-cols-5 gap-4">
            <div
            v-for="(item, i) in statistics"
            :key="i"
            :class="item.bg"
            class="rounded-md p-4 relative z-[1]"
            >
                <span class="block mb-2 text-sm text-slate-900 dark:text-white font-medium">
                    {{ item.title }}</span>

                <div class="block flex">
                    <span class="block flex-none mr-2 text-3xl text-slate-900 dark:text-white font-medium">
                        {{ item.count }}</span>
                    <div class="grid grid-cols-2 gap-1 space-x-2 rtl:space-x-reverse">
                        
                        <span class="block flex-none pl-2 text-sm" :class="item.percentClass">
                        {{item.percent}}</span>
                        <div class="flex-none text-xl" :class="item.text">
                            <Icon :icon="item.icon" />
                        </div>
                        <span class="block col-span-2 mb-1 text-slate-600 text-sm">From last week</span>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from "@/components/Icon";


export default {
    components: {
        Icon,
    },
    data() {
        return {
            statistics: [
                {
                    name: "total_sent",
                    title: "Total Sent",
                    count: "3,564",
                    bg: "bg-[#E5F9FF]",
                    text: "text-success-500",
                    percent: "25.67% ",
                    icon: "heroicons:arrow-trending-up",
                    percentClass: "text-primary-500",
                },
                {
                    name: "total_delivered",
                    title: "Total Delivered",
                    count: "564",
                    bg: "bg-[#FFEDE5]",
                    text: "text-danger-500",
                    percent: "25.67% ",
                    icon: "heroicons:arrow-trending-down",
                    percentClass: "text-primary-500",
                },
                {
                    name: "total_read",
                    title: "Total Read",
                    count: "+5.0%",
                    bg: "bg-[#EAE5FF]",
                    text: "text-success-500",
                    percent: "25.67% ",
                    icon: "heroicons:arrow-trending-up",
                    percentClass: "text-primary-500",
                },
                {
                    name: "total_replied",
                    title: "Total Replied",
                    count: "+5.0%",
                    bg: "bg-[#EAE5FF]",
                    text: "text-danger-500",
                    percent: "25.67% ",
                    icon: "heroicons:arrow-trending-down",
                    percentClass: "text-primary-500",
                },
                {
                    name: "total_errored",
                    title: "Total Errored",
                    count: "564",
                    bg: "bg-[#FFEDE5]",
                    text: "text-success-500",
                    percent: "25.67% ",
                    icon: "heroicons:arrow-trending-up",
                    percentClass: "text-primary-500",
                },
            ],
        }
    },
};
</script>