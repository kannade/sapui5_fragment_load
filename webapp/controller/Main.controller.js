sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("sap.training.controller.Main", {

		onInit: function() {
			//так как подключаем не shell, создадим модель i18n
			var oResourceModel = new sap.ui.model.resource.ResourceModel({
				bundleName: "sap.training.i18n.i18n"
			});

			// Устанавливаем для ядра с именем i18n
			sap.ui.getCore().setModel(oResourceModel, "i18n");

		},

		_getDialog: function() {
			if (!this._oDialog) {
				//создаем фрагмент
				this._oDialog = sap.ui.xmlfragment("idFrag", "sap.training.view.Dialog", this);

				//Добавляем зависимости для корректного отображения модели
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		},

		onOpenDialog: function() {
			this._getDialog().open();
		},

		onCloseDialog: function() {
			this._getDialog().close();

			var oInput = sap.ui.core.Fragment.byId("idFrag", "idInput");
			var oText = this.getView().byId("idText");

			oText.setText("Привет " + oInput.getValue());
		}

	});

});