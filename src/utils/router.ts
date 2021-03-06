import router, { constantRoutes } from '../router'
import Cookies from 'js-cookie'
import { post } from '@/api/http'
import { getMenuListByRoleId } from '@/api/url'
import { RouteRecordRaw } from 'vue-router'
import { isExternal, mapTwoLevelRouter, toHump } from '.'
import { Layout } from '@/components'
import layoutStore from '@/store'
import { defineAsyncComponent } from 'vue'
import LoadingComponent from '../components/loading/index.vue'
import { TOKEN_KEY } from '@/store/keys'
import useUserStore from '@/store/modules/user'
import pinia from '@/store/pinia'
import useButtonStore from '@/store/modules/buttons'
import { RoleButton } from '@/store/types'

const userStore = useUserStore(pinia)
const buttonStore = useButtonStore(pinia)

interface OriginRoute {
  menuUrl: string
  menuName?: string
  hidden?: boolean
  outLink?: string
  affix?: boolean
  cacheable?: boolean
  iconPrefix?: string
  icon?: string
  badge?: string | number
  isSingle?: boolean
  children: Array<OriginRoute>
  buttonList?: Array<RoleButton>
}

type RouteRecordRawWithHidden = RouteRecordRaw & { hidden: boolean }

function getRoutes() {
  return post({
    url: getMenuListByRoleId,
    data: {
      userId: userStore.userId,
      roleId: userStore.userId,
    },
  }).then((res: any) => {
    return generatorRoutes(res.data)
  })
}

function loadComponents() {
  return import.meta.glob('../views/**/*.vue')
}

const asynComponents = loadComponents()

function getComponent(it: OriginRoute) {
  return defineAsyncComponent({
    loader: asynComponents['../views' + it.menuUrl + '.vue'],
    loadingComponent: LoadingComponent,
  })
}

function getCharCount(str: string, char: string) {
  const regex = new RegExp(char, 'g')
  const result = str.match(regex)
  const count = !result ? 0 : result.length
  return count
}

function isMenu(path: string) {
  return getCharCount(path, '/') === 1
}

function getNameByUrl(menuUrl: string) {
  const temp = menuUrl.split('/')
  return toHump(temp[temp.length - 1])
}

function generatorRoutes(res: Array<OriginRoute>) {
  const tempRoutes: Array<RouteRecordRawWithHidden> = []
  res.forEach((it) => {
    const route: RouteRecordRawWithHidden = {
      path: it.outLink && isExternal(it.outLink) ? it.outLink : it.menuUrl,
      name: getNameByUrl(it.menuUrl),
      hidden: !!it.hidden,
      component: isMenu(it.menuUrl) ? Layout : getComponent(it),
      meta: {
        title: it.menuName,
        affix: !!it.affix,
        cacheable: !!it.cacheable,
        icon: it.icon || 'MenuOutline',
        iconPrefix: it.iconPrefix || 'xicon',
        badge: it.badge,
        isSingle: !!it.isSingle,
      },
    }
    if (it.buttonList) {
      buttonStore.addMenuButton(route.path, it.buttonList)
    }
    if (it.children) {
      route.children = generatorRoutes(it.children)
    }
    tempRoutes.push(route)
  })
  return tempRoutes
}

const whiteRoutes: string[] = ['/login']

function isTokenExpired(): boolean {
  const token = Cookies.get(TOKEN_KEY)
  return !!token
}
router.beforeEach(async (to) => {
  if (whiteRoutes.includes(to.path)) {
    return true
  } else {
    if (!isTokenExpired()) {
      return {
        path: '/login',
        query: { redirect: to.fullPath },
      }
    } else {
      const isEmptyRoute = layoutStore.isEmptyPermissionRoute()
      if (isEmptyRoute) {
        // ????????????
        const accessRoutes: Array<RouteRecordRaw> = []
        const tempRoutes = await getRoutes()
        accessRoutes.push(...tempRoutes)
        const mapRoutes = mapTwoLevelRouter(accessRoutes)
        mapRoutes.forEach((it: any) => {
          router.addRoute(it)
        })
        router.addRoute({
          path: '/:pathMatch(.*)*',
          redirect: '/404',
          hidden: true,
        } as RouteRecordRaw)
        layoutStore.initPermissionRoute([...constantRoutes, ...accessRoutes])
        return { ...to, replace: true }
      } else {
        return true
      }
    }
  }
})
