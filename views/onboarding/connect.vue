<template>
  <div>
    <div class="flex">
      <div class="flex-0 w-[380px] align-middle h-[75vh]">
        <div class="my-[35%]">
          <span class="font-bold ml-6">WHY CONNECT YOUR OWN NUMBER?</span>
          <ul>
            <li>
              <div class="flex p-2 w-80 m-4">
                <div class="flex-0 py-5 px-4">
                  <Icon icon="heroicons:chat-bubble-left" class="text-xl" />
                </div>
                <div class="flex-1 w-64 text-sm pr-2">Respond to unlimited customer initiated conversations with
                  auto replies & chatflows</div>
              </div>
            </li>
            <li>
              <div class="flex p-2 w-80 m-4">
                <div class="flex-0 py-5 px-4">
                  <Icon icon="heroicons:megaphone" class="text-xl" />
                </div>
                <div class="flex-1 w-64 text-sm pr-2">Start sending bulk WhatsApp Campaigns. See rules for
                  Messaging Limits</div>
              </div>
            </li>
            <li>
              <div class="flex p-2 w-80 m-4">
                <div class="flex-0 py-3 px-4">
                  <Icon icon="heroicons:building-storefront" class="text-xl" />
                </div>
                <div class="flex-1 w-64 text-sm pr-2">Create & connect your catalogue to your WhatsApp Business
                  Number</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex-1">
        <Card bodyClass="px-10 py-4" className="max-w-[55em] h-[80vh] shadow-md">
          <div>
            <span class="font-semibold text-lg">Connect a Number for your WhatsApp Business API Account</span>
            <SimpleBar class="w-[50em] h-[51vh] my-4 py-3 bg-slate-100 rounded-md shadow-sm">

              <div class="accordion rounded-md py-2" v-for="(item, i) in items" :key="i">

                <div
                  class="cursor-pointer transition duration-150 font-medium w-full text-start text-base text-slate-600 px-8"
                  @click="activeIndex = activeIndex === i ? null : i">
                  <div class="flex justify-between">
                    {{ item.title }}

                    <div class="flex mt-1">
                      <span class="text-sm" v-if="activeIndex !== i">See More</span>
                      <span class="text-sm" v-if="activeIndex === i">See Less</span>
                      <span class="text-slate-900 text-[18px] ml-1 transition-all duration-300 h-5"
                        :class="activeIndex === i ? 'rotate-180 transform' : ''">
                        <Icon icon="heroicons-outline:chevron-down" />
                      </span>
                    </div>
                  </div>
                  <ul v-for="(content, c) in item.content1" :key="c">
                    <li class="px-8 py-1 text-sm text-slate-600 font-normal" v-html="truncateText(content, 100, i)"></li>
                  </ul>

                </div>

                <Transition enter-active-class="submenu_enter-active" leave-active-class="submenu_leave-active"
                  @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave"
                  @leave="leave" @after-leave="afterLeave">
                  <div class="text-sm text-slate-600 font-normal rounded-b-md" v-if="i === activeIndex" :class="[
                    i === activeIndex
                      ? ''
                      : 'l',
                  ]">
                    <ul v-if="item.content2" v-for="(content, c) in item.content2" :key="c">
                      <li class="px-16 py-1" v-html="content"></li>
                    </ul>
                    
                    <ul v-if="item.list" v-for="(listitem, l) in item.list" :key="l">
                      <li class="px-20 py-1" v-html="listitem"></li>
                    </ul>
                    
                  </div>
                </Transition>

              </div>
            </SimpleBar>
            <div class="mx-[25%]">
              <Checkbox 
                label="I have read & understood all the above points" 
                v-model="checked"
                activeClass="ring-primary-500 bg-primary-500"
                />
              <FBconnect :isDisabled="!checked" btnClass="w-96 my-4" />
            </div>
          </div>
        </Card>
      </div>

    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { SimpleBar } from "simplebar-vue3";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Checkbox from "@/components/Checkbox";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import FBconnect from "./FBconnect";

export default {
  components: {
    Icon,
    Checkbox,
    SimpleBar,
    Card,
    FBconnect,
  },
  data() {
    return {
      activeIndex: 0,
      checked: false,
      items: [
        {
          title: "1. Before using a number which is already on WhatsApp, read below",
          content1: [
            "- You will have to delete the WhatsApp account on the number.",
            "- You can't use the number on WhatsApp Personal / Business apps while you use the number with Implifie.",
          ],
          content2: [
            "- Due to WhatsApp’s rules, going back to WhatsApp apps from Implifie is a time taking process & not guaranteed.",
            "- Old chats on your number’s WhatsApp account will get deleted and won’t show up on Implifie.",
            "- Hence, we recommend using a new number for your WhatsApp Business API account, unless you are absolutely confident of using your current WhatsApp number.",
          ]
        },
        {
          title: "2. Some Industries are restricted from WhatsApp APIs",
          content1: [
            "If your business transacts in any of the below products, we advise you to not connect your number to Interakt since WhatsApp might ban your number. For more details, read the <a href=\'https://www.whatsapp.com/legal/commerce-policy?l=et\' target=\'_blank\'>WhatsApp Commerce Policy</a> & <a href=\'https://faq.whatsapp.com/1473079883061196/?locale=et_EE&fbclid=IwAR3eTVXFQodCCTmG_Rwc49LUdaYg5880hzY_BF3zfB7CK8lQD9DRdLjnxdo\' target=\'_blank\'>How to comply</a>.",
          ],
          list: [
          "- Medical and healthcare products",
          "- Unsafe ingestible supplements",
          "- Drugs, whether prescription, recreational, or otherwise",
          "- Tobacco items and related paraphernalia",
          "- Alcohol",
          "- Weapons, ammunition, or explosives",
          "- Animals",
          "- Adult products or services",
          "- Body parts and fluids",
          "- Items or products with overtly sexualized positioning",
          "- Real money gambling services",
          "- Dating services",
          "- Products or items that facilitate or encourage unauthorized access to digital media",
          "- Digital and subscription services, including links to or processing of any subscription sales, renewals, or upgrades",
          "- Business models, goods, items, or services that WhatsApp determines may be or are fraudulent, misleading, offensive, or deceptive, or may be or are exploitative, inappropriate, or exert undue pressure on targeted groups",
          "- Real, virtual, or fake currency",
          "- Third-Party Infringement"
          ]
        },
        {
          title: "Keep the following ready before connecting the number",
          content1: [
            "- Access to your Facebook Business Manager.",
            "- Your company legal name and address.",
          ],
          content2: [
            "- A phone number which you will use for your WhatsApp Business API Account & can receive an OTP on.",
            "- An active website of your business.",
          ]
        },
      ],
    };
  },
  methods: {
    beforeEnter(element) {
      requestAnimationFrame(() => {
        if (!element.style.height) {
          element.style.height = "0px";
        }

        element.style.display = null;
      });
    },
    truncateText(text, maxLength, index) {
      if (this.activeIndex === index) {
        // When the tab is expanded, show the full content
        return text;
      } else if (text.length > maxLength) {
        // When the tab is collapsed, truncate the text
        return text.slice(0, maxLength) + ' ...';
      }
      return text;
    },
    enter(element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.style.height = `${element.scrollHeight}px`;
        });
      });
    },
    afterEnter(element) {
      element.style.height = null;
    },
    beforeLeave(element) {
      requestAnimationFrame(() => {
        if (!element.style.height) {
          element.style.height = `${element.offsetHeight}px`;
        }
      });
    },
    leave(element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.style.height = "0px";
        });
      });
    },
    afterLeave(element) {
      element.style.height = null;
    },
  }
}

</script>