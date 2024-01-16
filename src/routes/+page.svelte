<script lang="ts">
  import { enhance } from '$app/forms';
  import { error } from '@sveltejs/kit';
  import PDFMerger from 'pdf-merger-js/browser';

  let form: any

  let file_1: File | null = null
  let file_2: File | null = null
  function onChange_1(
    event: Event & { currentTarget: EventTarget & HTMLInputElement },
  ) {
    file_1 = (event.target as HTMLInputElement)?.files?.[0] ?? null
  }

  function onChange_2(
    event: Event & { currentTarget: EventTarget & HTMLInputElement },
  ) {
    file_2 = (event.target as HTMLInputElement)?.files?.[0] ?? null
  }

  async function mergeClick () {
    // const file_1 = form.get('image-upload_1') as File;
    // const file_2 = form.get('image-upload_2') as File;

    if (!(file_1 && file_2)) {
      error(400, { message: 'No files to merge' });
    }
    var merger = new PDFMerger();

    try {
      await merger.add(file_1);
      await merger.add(file_2);
      await merger.save('merged')
    }
    catch (error){
      console.error('Error merging and converting:', error);

    }
  }


  $: buttonClass_1 = file_1 && file_2
    ? 'border-black bg-black text-white hover:bg-white hover:text-black'
    : 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400';
</script>

<main class="relative flex min-h-screen flex-col items-center justify-center">
  <!-- <a
    href="https://vercel.com/templates/next.js/blob-sveltekit"
    class="group mt-20 sm:mt-0 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
  >
    Deploy your own to Vercel
  </a> -->
  <h1
    class="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
  >
    Merge PDFs
  </h1>
  <div
    class="flex flex-col items-center w-full max-w-xl p-12 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg"
  >
    <form
      class="grid gap-6 w-full"
      action="#"
      method=""
      enctype="multipart/form-data"
      use:enhance={() => {
        return async ({ update }) => {
          // file_1 = null
          update({ reset: true })
        }
      }}
    >
      <div>
        <div class="space-y-1 mb-4">
          <h2 class="text-xl font-semibold">Upload MS word Pdf</h2>
          <p class="text-sm text-gray-500">
            Accepted formats: .pdf
          </p>
        </div>
        <label
          for="image-upload_1"
          class="group relative mt-2 flex h-72 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
        >
          {#if !file_1}
            <div class="absolute z-[5] h-full w-full rounded-md">
              <div
                class={`${''} absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${'bg-white opacity-100 hover:bg-gray-50'}`}
              >
                <svg
                  class={`${'scale-100'} h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
                  />
                  <path d="M12 12v9" />
                  <path d="m16 16-4-4-4 4" />
                </svg>
                <p class="mt-2 text-center text-sm text-gray-500">
                  Click to upload.
                </p>
                <p class="mt-2 text-center text-sm text-gray-500">
                  Max file size: 50MB
                </p>
                <span class="sr-only">Photo upload</span>
              </div>
            </div>
          {:else}
            <p>{file_1.name}</p>
          {/if}
        </label>
        <div class="mt-1 flex rounded-md shadow-sm bg-gray-100">
          <input
            id="image-upload_1"
            name="image-upload_1"
            type="file"
            accept=".pdf"
            class="sr-only"
            on:change={onChange_1}
          />
        </div>
      </div>
      
      <div>
        <div class="space-y-1 mb-4">
          <h2 class="text-xl font-semibold">File 2</h2>
          <p class="text-sm text-gray-500">
            Accepted formats: .pdf
          </p>
        </div>
        <label
          for="image-upload_2"
          class="group relative mt-2 flex h-72 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
        >
          {#if !file_2}
            <div class="absolute z-[5] h-full w-full rounded-md">
              <div
                class={`${''} absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${'bg-white opacity-100 hover:bg-gray-50'}`}
              >
                <svg
                  class={`${'scale-100'} h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
                  />
                  <path d="M12 12v9" />
                  <path d="m16 16-4-4-4 4" />
                </svg>
                <p class="mt-2 text-center text-sm text-gray-500">
                  Click to upload.
                </p>
                <p class="mt-2 text-center text-sm text-gray-500">
                  Max file size: 50MB
                </p>
                <span class="sr-only">Photo upload</span>
              </div>
            </div>
          {:else}
            <p>{file_2.name}</p>
          {/if}
        </label>
        <div class="mt-1 flex rounded-md shadow-sm bg-gray-100">
          <input
            id="image-upload_2"
            name="image-upload_2"
            type="file"
            accept=".pdf"
            class="sr-only"
            on:change={onChange_2}
          />
        </div>
      </div>

      <button
        disabled={!(file_1&&file_2)}
        class="{buttonClass_1} flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
        on:click={mergeClick}
      >
        <p class="text-sm">Merge PDFs</p>
      </button>
      <!-- {#if form && !file_1}
        <div class="p-2">
          <p class="font-semibold text-gray-900">File uploaded!</p>
          <p class="mt-1 text-sm text-gray-500">
            Your file has been uploaded to{' '}
            <a
              class="font-medium text-gray-900 underline"
              href={form.uploaded}
              target="_blank"
              rel="noopener noreferrer"
            >
              {form.uploaded}
            </a>
          </p>
        </div>
      {/if} -->
    </form>
  </div>
  <!-- <div
    class="flex justify-center gap-1 font-light text-gray-600 w-full max-w-lg text-center mt-6"
  >
    <a
      href="https://vercel.com/blob"
      class="font-medium underline underline-offset-4 hover:text-black transition-colors"
    >
      Vercel Blob
    </a>{' '}
    demo.
    <span>Built with</span>
    <a
      href="https://kit.svelte.dev/"
      class="flex items-center font-medium underline underline-offset-4 hover:text-black transition-colors"
    >
      <img src="svelte_logo.png" alt="svelte logo" class="h-6 mx-1" />
      <p>SvelteKit</p>
    </a>
    .
  </div> -->
  <!-- <div class="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between">
    <a href="https://vercel.com">
      <img src="/vercel.svg" alt="Vercel Logo" width={100} height={24} />
    </a>
    <a
      href="https://github.com/vercel/examples/tree/main/storage/blob-sveltekit"
      class="flex items-center space-x-2"
    >
      <img src="/github.svg" alt="GitHub Logo" width={24} height={24} />
      <p class="font-light">Source</p>
    </a>
  </div> -->
</main>
