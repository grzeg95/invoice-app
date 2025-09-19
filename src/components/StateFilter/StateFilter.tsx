import {isEqual} from 'lodash';
import {type ChangeEvent, useEffect, useRef, useState} from 'react';
import isonArrowDown from '../../assets/icon-arrow-down.svg';
import {BreakpointsDevices} from '../../context/Breakpoints/breakpoints';
import {useBreakpoints} from '../../context/Breakpoints/useBreakpoints';
import type {InvoiceState} from '../../models/firestore/InvoiceState';
import {Menu, type StrategyOption} from '../ui/Menu/Menu';
import styles from './StateFilter.module.scss';

type StateFilterProps = {
  defaultSelectedOptions?: InvoiceState[];
  onChange: (selectedOptions: InvoiceState[]) => void
};

export function StateFilter({defaultSelectedOptions = [], onChange}: StateFilterProps) {

  const {activeBreakpoints} = useBreakpoints();
  const isMobile = !!activeBreakpoints.find((b) => b === BreakpointsDevices.mobile);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<InvoiceState[]>(() => defaultSelectedOptions);
  const oldSelectedOptions = useRef<InvoiceState[]>([]);
  const stateFilterTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {

    if (!isEqual(selectedOptions, oldSelectedOptions)) {
      oldSelectedOptions.current = selectedOptions;
      onChange(selectedOptions);
    }

  }, [onChange, selectedOptions]);

  function handleOnClose() {
    setIsMenuOpen(false);
  }

  function toggleIsMenuOpen() {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  }

  function handleOnStateSelected(e: ChangeEvent<HTMLInputElement>) {

    setSelectedOptions((prevSelectedOptions) => {

      if (e.target.checked) {
        if (!prevSelectedOptions.includes(e.target.value as InvoiceState)) {
          const newSelectedOptions = [...prevSelectedOptions, e.target.value as InvoiceState];
          newSelectedOptions.sort((a, b) => a.localeCompare(b));
          return newSelectedOptions;
        }
      } else {
        if (prevSelectedOptions.includes(e.target.value as InvoiceState)) {
          const newSelectedOptions = prevSelectedOptions.filter((option) => option !== e.target.value as InvoiceState);
          newSelectedOptions.sort((a, b) => a.localeCompare(b));
          return newSelectedOptions;
        }
      }

      return [...prevSelectedOptions];
    });

    setIsMenuOpen(false);
  }

  const filterStrategiesOptions: StrategyOption[] = [
    {name: 'bottom-center', offset: {y: 22}},
    {name: 'top-center', offset: {y: -22}}
  ];

  return (
    <div>
      <button
        ref={stateFilterTrigger}
        className={styles['state-filter-button']}
        onClick={toggleIsMenuOpen}
      >
        {isMobile ?
          'Filter' : 'Filter by state'}
          <img
            className={`${styles['state-filter-button-icon']} ${isMenuOpen ? styles['active'] : ''}`}
            src={isonArrowDown}
            alt=''
          />
      </button>
      <Menu
        triggerRef={stateFilterTrigger}
        strategiesOptions={filterStrategiesOptions}
        onClose={handleOnClose}
        isOpen={isMenuOpen}
      >
        <div className={styles['state-filter-options']}>
          {['draft', 'pending', 'paid'].map((state) => (
            <div key={state} className={styles['state-filter-option']}>
              <label>
                <input type='checkbox'
                       value={state}
                       checked={selectedOptions.includes(state as InvoiceState)}
                       onChange={handleOnStateSelected}/>
                {state}
              </label>
            </div>
          ))}
        </div>
      </Menu>
    </div>
  );
}
