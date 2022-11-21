import PropTypes from "prop-types";
//
import SettingsDrawer from "./drawer";
//
import ThemeContrast from "./ThemeContrast";
import ThemeColorPresets from "./ThemeColorPresets";

// ----------------------------------------------------------------------

ThemeSettings.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function ThemeSettings({ children }) {
  return (
    <ThemeColorPresets>
      <ThemeContrast>
        {children}
        <SettingsDrawer />
      </ThemeContrast>
    </ThemeColorPresets>
  );
}
