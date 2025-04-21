
import React from 'react';
import { MantineProvider as BaseMantineProvider, MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    commission: [
      '#E7F5FF', // 0
      '#D0EBFF', // 1
      '#A5D8FF', // 2
      '#74C0FC', // 3
      '#4DABF7', // 4
      '#339AF0', // 5
      '#228BE6', // 6
      '#1C7ED6', // 7
      '#1971C2', // 8
      '#1864AB', // 9
    ],
  },
  primaryColor: 'commission',
  primaryShade: 7,
  fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
  components: {
    Paper: {
      defaultProps: {
        p: 'md',
        shadow: 'xs',
        radius: 'md',
      },
    },
    NavLink: {
      styles: {
        root: {
          borderRadius: '0.25rem',
        }
      }
    }
  }
};

interface MantineProviderProps {
  children: React.ReactNode;
}

export const MantineProvider: React.FC<MantineProviderProps> = ({ children }) => {
  return (
    <BaseMantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      {children}
    </BaseMantineProvider>
  );
};
