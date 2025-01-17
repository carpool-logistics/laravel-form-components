<div class="relative">
    <div x-data="customSelect({
            @if ($hasLivewire())
                _wire: @this,
            @endif
            @if ($hasWireModel())
                value: @entangle($attributes->wire('model')),
                @if ($attributes->wire('model')->hasModifier('defer'))
                    _wireModelName: '{{ $attributes->wire('model')->value() }}',
                @endif
            @elseif ($hasXModel())
                value: {{ $attributes->first('x-model') }},
            @else
                value: {{ \Illuminate\Support\Js::from($value) }},
            @endif
            ...{{ $configToJs() }},
         })"
         @include('form-components::partials.select.select-directives')
         {{ $attributes->class(['relative  focus:outline-none'])->except(['tabindex', 'data-name']) }}
         x-bind:class="{ 'focus:border-blue-300 focus:ring-opacity-50 focus:ring-4 focus:ring-blue-400': ! open }"
         tabindex="0"
         data-name="{{ \Illuminate\Support\Str::slug($name) }}"
         @if ($hasLivewire()) wire:ignore.self @endif
        {{ $extraAttributes }}
    >
        {{-- menu --}}
        <div x-ref="menu"
             x-cloak
             tabindex="-1"
             x-bind:aria-hidden="JSON.stringify(! open)"
             x-bind:class="{ 'invisible': ! open }"
             class="custom-select-menu z-top"
             @if ($hasLivewire()) wire:ignore.self @endif
        >
            <div class="custom-select-menu__container | max-h-[260px] overflow-auto ">
                <ul x-ref="listbox"
                    role="listbox"
                    id="{{ \Illuminate\Support\Str::slug($name) }}_listbox"
                    tabindex="-1"
                    @if ($multiple) aria-multiselectable="true" @endif
                    @if ($livewireSearch)
                        wire:loading.class.delay="hidden"
                        wire:target="{{ $livewireSearch }}"
                    @endif
                >
                    @if ($slot->isNotEmpty())
                        {{ $slot }}
                    @else
                        @forelse ($options as $option)
                            <x-form-components::inputs.custom-select-option
                                :value="$optionValue($option)"
                                :label="$optionLabel($option)"
                                :selected-label="$optionSelectedLabel($option)"
                                :disabled="$optionIsDisabled($option)"
                                :is-opt-group="$optionIsOptGroup($option)"
                            />
                        @empty
                            <x-form-components::inputs.partials.no-options
                                name="{{ $name }}"
                                no-options-text="{{ $noOptionsText }}"
                                no-results-text="{{ $noResultsText }}"
                            />
                        @endforelse
                    @endif

                    @unless ($livewireSearch)
                        <x-form-components::inputs.partials.no-options
                            name="{{ $name }}"
                            no-results-text="{{ $noResultsText }}"
                            search="..."
                            style="display: none;"
                            x-ref="noResults"
                        />
                    @endunless
                </ul>

                @if ($livewireSearch)
                    <x-form-components::inputs.partials.select-loader target="{{ $livewireSearch }}" />
                @endif
            </div>
        </div>

        {{-- trigger --}}
        @include('form-components::partials.select.select-trigger', ['type' => 'custom'])

        {{-- selected value (mostly for non-livewire forms) --}}
        @unless ($hasWireModel() || $hasXModel())
            @if ($multiple)
                <template x-for="singleValue in value">
                    <input type="hidden" name="{{ $name }}[]" x-bind:value="singleValue">
                </template>
            @else
                <input type="hidden" name="{{ $name }}" x-bind:value="value">
            @endif
        @endunless
    </div>
</div>
