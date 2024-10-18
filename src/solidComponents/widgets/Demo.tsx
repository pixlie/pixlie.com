import ForceGraph3D from '3d-force-graph';
import { createResource, createSignal, onMount, type Component } from 'solid-js';
import { Input, Textarea } from '../ui/Form';


const Demo: Component = () => {
  let graphRef: HTMLDivElement | undefined;

  onMount(() => {
    if (graphRef) {
      const graph = ForceGraph3D()(graphRef)
        .jsonUrl("https://github.com/vasturiano/3d-force-graph/blob/master/example/datasets/miserables.json")
        .nodeLabel('id')
        .nodeAutoColorBy('group');
    }
  });

  return (
    <div class="flex flex-col rounded-lg backdrop-blur border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 shadow p-4 sm:p-6 lg:p-8">
      <div ref={graphRef}></div>
    </div>
  );
};

export default Demo;
