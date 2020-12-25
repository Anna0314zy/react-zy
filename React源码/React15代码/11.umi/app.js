export function patchRoutes(routes) {
    console.log(routes, 'routes');
    routes.unshift({
      path: '/foo',
      exact: true,
      component: () => <div>foo</div>,
    });
  }
  //根据用户权限动态修改数组