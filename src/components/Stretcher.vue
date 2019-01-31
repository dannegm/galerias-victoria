<template>
    <section class="stretcher-wrapper">
        <ul class="stretcher">
            <li
                class="stretcher-item"
                v-for="(item, index) in internalItems"
                :key="index"
                :class="{
                    'active': item.active,
                    'inactive': item.inactive,
                }"
                :style="`background-image:url(${item.background})`"
                @mouseenter="mouseenter(index)"
                @mouseleave="mouseleave(index)">
                <div class="stretcher-logo">
                    <div class="text">
                        <span class="fo" :class="`fo-${item.icon}`"></span>
                        <span class="text-intro">{{item.name}}</span>
                    </div>
                </div>

                <figure>
                    <h4>{{item.name}}</h4>
                    <figcaption></figcaption>
                </figure>

                <a :href="`/antiques?cat=${item.name}`"></a>
            </li>

            <li class="stretcher-item more">
                <div class="more-icon">
                    <span data-title-show="Ver más" data-title-hide="+"></span>
                </div>
                <a :href="`/antiques`"></a>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name: 'Stretcher',
    props: [
        'items',
    ],
    methods: {
        mouseenter (index) {
            this.internalItems = this.internalItems.map (i => ({
                ...i,
                inactive: true,
            }));

            this.internalItems[index].inactive = false;
            this.internalItems[index].active = true;
        },
        mouseleave (index) {
            this.internalItems = this.internalItems.map (i => ({
                ...i,
                active: false,
                inactive: false,
            }));
        },
    },
    watch: {
        items: {
            deep: true,
            handler: function (nitems, oitems) {
                this.internalItems = nitems.map (i => ({
                    ...i,
                    active: false,
                    inactive: false,
                }));
            }
        }
    },
    data () {
        return {
            internalItems: [],
            scrolled: false,
            isBottom: false,
        }
    }
}
</script>
