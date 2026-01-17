"use client";
import React from "react";
import { CrossIcon, Reporticon } from "@/icons";

import ThemeButton, { buttonVariant } from "../ui/buttons/ThemeButton";
import { useBodyScrollLock } from "@/app/hooks/useBodyScrollLock";
import Portal from "../ui/portal";

export enum ModalPosition {
  CENTER = "center",
  RIGHT = "right",
}

interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onConfirm?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  confirmLabel?: string;
  cancelLabel?: string;
  size?: "small" | "medium" | "large" | "extraLarge";
  outSideClickClose?: boolean;
  onCancel?: () => void;
  confirmBtnVarient?: buttonVariant;
  cancelBtnVarient?: buttonVariant;
  showFooter?: boolean;
  bodyPaddingClasses?: string;
  position?: ModalPosition;
  confimBtnDisable?: boolean;
  btnFullWidth?: boolean;
  hideCancelBtn?: boolean;
  btnIcon?: React.ReactNode;
  scrollNeeded?: boolean;
  hideConfirmButton?: boolean;
  cancelBtnIcon?: React.ReactNode;
  disableCloseButton?: boolean;
  hideCrossButton?: boolean;
  mainIcon?: React.ReactNode;
}

const sizeClasses = {
  small: "sm:max-w-lg", // ~512px
  medium: "sm:max-w-[600px]", // ~600px
  large: "sm:max-w-3xl", // ~768px
  extraLarge: "sm:max-w-5xl", // ~1024px
};

const AppModal: React.FC<AppModalProps> = ({
  isOpen,
  onClose,
  title = "Modal Title",
  subtitle,
  icon,
  children,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  size = "medium",
  outSideClickClose = true,
  onCancel,
  confirmBtnVarient,
  cancelBtnVarient = "danger",
  showFooter = true,
  bodyPaddingClasses = "p-3 md:p-5",
  position = ModalPosition.CENTER,
  confimBtnDisable,
  btnFullWidth,
  hideCancelBtn,
  hideConfirmButton,
  btnIcon,
  scrollNeeded = true,
  cancelBtnIcon,
  disableCloseButton = false,
  hideCrossButton = false,
  mainIcon,
}) => {
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  const baseModalClasses = " shadow-xl h-full flex flex-col";
  const baseWrapperClasses =
    "fixed inset-0 z-[100] bg-black/50 backdrop-blur-xs flex";

  const modalClasses =
    position === ModalPosition.RIGHT
      ? `${baseModalClasses} w-full md:w-[600px] md:rounded-xl overflow-hidden`
      : `${baseModalClasses} sm:h-fit relative w-full sm:max-h-[90dvh]  md:m-auto container md:mx-4 ${sizeClasses[size]}`;

  const wrapperClasses =
    position === ModalPosition.RIGHT
      ? `${baseWrapperClasses} justify-end items-stretch p-0 md:p-5`
      : `${baseWrapperClasses} min-h-dvh top-0 items-end md:items-center justify-center`;

  return (
    <Portal>
      <div
        className={wrapperClasses}
        onClick={outSideClickClose ? onClose : undefined}
      >
        <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
          <div
            className={`px-6 relative bg-white flex sm:rounded-t-xl items-center ${
              position === ModalPosition.CENTER
                ? "justify-end py-3"
                : "justify-between py-3 border-b border-salte-200"
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              {icon && (
                <div className="h-9 w-9 shrink-0 rounded-xl bg-white flex items-center justify-center border border-lightGray">
                  {icon}
                </div>
              )}
              {position === ModalPosition.RIGHT && (
                <div>
                  <h2
                    className={`text-base ${
                      subtitle ? "md:text-lg" : "md:text-lg"
                    }  text-slate-900 font-semibold`}
                  >
                    {title}
                  </h2>
                  {subtitle && (
                    <h3 className="text-gray-500 text-xs md:text-sm">
                      {subtitle}
                    </h3>
                  )}
                </div>
              )}
            </div>

            {!hideCrossButton && (
              <button
                onClick={disableCloseButton ? undefined : onClose}
                disabled={disableCloseButton}
                className={`md:p-1 w-7 h-7 absolute top-3 end-6 flex items-center justify-center p-1 hover:bg-slate-200 rounded-full ${
                  disableCloseButton
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
              >
                <CrossIcon />
              </button>
            )}
          </div>

          {mainIcon && (
            <div className="bg-white flex items-center justify-center">
              <div className="rounded-full flex items-center mb-6 justify-center w-16 h-16 bg-blue-100">
                {mainIcon}
              </div>
            </div>
          )}

          {position === ModalPosition.CENTER && (
            <div className="bg-white">
              <h2
                className={`text-base text-center md:text-2xl text-slate-900 font-semibold`}
              >
                {title}
              </h2>
              {subtitle && (
                <h3 className="text-slate-900 text-center text-sm md:text-base">
                  {subtitle}
                </h3>
              )}
            </div>
          )}

          <div
            className={`flex-1 bg-white ${
              scrollNeeded && "overflow-y-auto max-h-dvh "
            }  ${!showFooter && "sm:rounded-b-xl"} ${bodyPaddingClasses}`}
          >
            {children}
          </div>

          {showFooter && (
            <div
              className={`${
                btnFullWidth && "gap-6"
              } border-t border-slate-200 bg-white flex gap-2 sm:rounded-b-xl items-center justify-between p-2 md:px-6 md:py-5`}
            >
              {!hideCancelBtn && (
                <ThemeButton
                  label={cancelLabel}
                  onClick={onCancel ? onCancel : onClose}
                  size="medium"
                  // className={`${
                  //   btnFullWidth ? "flex-1" : "w-full sm:w-fit sm:min-w-36"
                  // }`}
                  variant={cancelBtnVarient}
                  icon={cancelBtnIcon}
                />
              )}
              {onConfirm && !hideConfirmButton && (
                <ThemeButton
                  label={confirmLabel}
                  // className={` ${
                  //   btnFullWidth ? "flex-1" : "w-full sm:w-fit sm:min-w-36"
                  // }`}
                  onClick={onConfirm}
                  size="medium"
                  variant={confirmBtnVarient}
                  disabled={confimBtnDisable}
                  icon={btnIcon}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default AppModal;
