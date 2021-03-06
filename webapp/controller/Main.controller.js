sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/model/resource/ResourceModel"
], function (Controller, Fragment, ResourceModel) {
	"use strict";

	return Controller.extend("sap.training.controller.Main", {

		onInit: function () {
			//так как подключаем не shell, создадим модель i18n
			var oResourceModel = new ResourceModel({
				bundleName: "sap.training.i18n.i18n"
			});

			// Устанавливаем для ядра с именем i18n
			sap.ui.getCore().setModel(oResourceModel, "i18n");

		},

		_getDialog: function () {
			var promise = new Promise(function (resolve, reject) {
				if (!this._oDialog) {
					//Зугразим фрагмент
					Fragment.load({
						id: "idFrag", //id
						type: "XML", // тип фрагмента
						name: "sap.training.view.Dialog", // путь до фрагмента
						controller: this //укажем контроллер, чтобы правильно отрабатывала кнопка "закрыть в диалоговом окне"
					}).then(function (oDialog) {
						resolve(oDialog);
					});
				} else {
					resolve(this._oDialog);
				}
			}.bind(this));

			return promise;
		},

		onOpenDialog: function () {
			this._getDialog().then(function (oDialog) {
				this._oDialog = oDialog;
				//Добавляем зависимости для корректного отображения модели
				this.getView().addDependent(this._oDialog);
				this._oDialog.open(); // откроем
			}.bind(this));
		},

		onCloseDialog: function () {
			this._getDialog().then(function (oDialog) {
				this._oDialog.close(); //закроем

				//обращаемся к полю ввода, расположенного в фрагменте
				var oInput = Fragment.byId("idFrag", "idInput");
				var oText = this.getView().byId("idText");

				oText.setText("Привет " + oInput.getValue());
			}.bind(this));

		}

	});

});