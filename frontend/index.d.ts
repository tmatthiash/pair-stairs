import { Store } from './src/store/store'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties{
        $store: Store;
    }
}