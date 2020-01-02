export default class CollectionService {

	// types

	types = {
		COLLECTIONS_START: `COLLECTIONS_START`,
		COLLECTIONS_ABORT: `COLLECTIONS_ABORT`,
		COLLECTIONS_CLEAN: `COLLECTIONS_CLEAN`,
		COLLECTIONS_ERROR: `COLLECTIONS_ERROR`,
		COLLECTIONS_GET: `COLLECTIONS_GET`,
		COLLECTION_EDIT: `COLLECTION_EDIT`,
		COLLECTION_ROLES_GET: `COLLECTION_ROLES_GET`,
		COLLECTION_ROLES_UPDATE: `COLLECTION_ROLES_UPDATE`,
	}

	roleEndpoints = {
		linkCourses: `linkCourses`,
		addTA: `addTA`,
		addException: `addException`,
		unlinkCourses: `unlinkCourses`,
		removeTA: `removeTA`,
		removeException: `removeException`,
	}

	// action creators

	actions = {
		collectionsStart: () => ({ type: this.types.COLLECTIONS_START }),
		collectionsAbort: () => ({ type: this.types.COLLECTIONS_ABORT }),
		collectionsClean: () => ({ type: this.types.COLLECTIONS_CLEAN }),
		collectionsError: error => ({ type: this.types.COLLECTIONS_ERROR, payload: { error } }),
		collectionsGet: collections => ({ type: this.types.COLLECTIONS_GET, payload: { collections } }),
		collectionEdit: collection => ({ type: this.types.COLLECTION_EDIT, payload: { collection }}),
		collectionRolesGet: data => ({ type: this.types.COLLECTION_ROLES_GET, payload: { ...data }}),
		collectionRolesUpdate: data => ({ type: this.types.COLLECTION_ROLES_UPDATE, payload: { ...data }}),
	}

	// default store

	store = {
		roles: {},
		cache: {},
		loading: false,
		lastFetched: 0,
	}

	// reducer

	reducer = (store = this.store, action) => {

		const {
			COLLECTIONS_START,
			COLLECTIONS_ABORT,
			COLLECTIONS_CLEAN,
			COLLECTIONS_ERROR,
			COLLECTIONS_GET,
			COLLECTION_EDIT,
			COLLECTION_ROLES_GET,
			COLLECTION_ROLES_UPDATE,
		} = this.types

		switch (action.type) {

		case COLLECTIONS_START:
			return {
				...store,
				loading: true,
			}

		case COLLECTIONS_ABORT:
			return {
				...store,
				loading: false,
			}

		case COLLECTIONS_CLEAN:
			return {
				...store,
				cache: {},
			}

		case COLLECTIONS_ERROR:
			console.error(action.payload.error)
			return {
				...store,
				loading: false,
			}

		case COLLECTIONS_GET:
			return {
				...store,
				cache: {
					...store.cache,
					...action.payload.collections,
				},
				loading: false,
				lastFetched: Date.now(),
			}

		case COLLECTION_EDIT:
			return {
				...store,
				cache: {
					...store.cache,
					[action.payload.collection.id]: action.payload.collection,
				},
				loading: false,
			}

		case COLLECTION_ROLES_GET:
			return {
				...store,
				roles: {
					...store.roles,
					...action.payload,
				},
			}

		case COLLECTION_ROLES_UPDATE:
			return {
				...store,
				roles: {
					...store.roles,
					...action.payload,
				},
			}

		default:
			return store
		}
	}

	// thunks

	getCollections = (force = false) => async (dispatch, getState, { apiProxy }) => {

		const time = Date.now() - getState().collectionStore.lastFetched

		const stale = time >= process.env.REACT_APP_STALE_TIME

		if (stale || force) {

			dispatch(this.actions.collectionsStart())

			try {

				const result = await apiProxy.user.collections.get()

				dispatch(this.actions.collectionsGet(result))

			} catch (error) {
				console.error(error.message)
				dispatch(this.actions.collectionsError(error))
			}

		} else dispatch(this.actions.collectionsAbort())
	}

	updateCollectionStatus = (id, action) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.collectionsStart())

		const currentState = getState().collectionStore.cache[id]

		let abort = false

		switch (action) {
		case `publish`:
			currentState.published = true
			break

		case `unpublish`:
			currentState.published = false
			break

		case `archive`:
			currentState.archived = true
			break

		case `unarchive`:
			currentState.published = false
			break

		default:
			abort = true
			break
		}

		if (abort) dispatch(this.actions.collectionsAbort())
		else {
			try {
				const result = await apiProxy.collection.edit(id, action)

				console.log(result)

				dispatch(this.actions.collectionEdit(currentState))

			} catch (error) {
				dispatch(this.actions.collectionsError(error))
			}
		}
	}

	getCollectionRoles = (collectionId, force = false) => {
		return async (dispatch, getState, { apiProxy }) => {

			const store = getState().collectionStore

			const time = Date.now() - store.lastFetched

			const stale = time >= process.env.REACT_APP_STALE_TIME

			const { roles } = store
			const cached = Object.keys(roles).includes(collectionId)

			if (stale || !cached || force) {

				dispatch(this.actions.collectionsStart())

				try {

					const { data = {} } = await apiProxy.collection.permissions.get(collectionId)
					dispatch(this.actions.collectionRolesGet({ [collectionId]: data }))

				} catch (error) {
					dispatch(this.actions.collectionsError(error))
				}

			} else dispatch(this.actions.collectionsAbort())
		}
	}

	updateCollectionRoles = (collectionId, endpoint, body) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.collectionsStart())

		try {
			const { data = {} } = await apiProxy.collection.permissions.post(collectionId, endpoint, body)

			const newRoles = getState().collectionStore.roles[collectionId]

			switch (endpoint) {
			case this.roleEndpoints.linkCourses:
				newRoles.courses = [...newRoles.courses, data[0]]
				break
			case this.roleEndpoints.unlinkCourses:
				newRoles.courses = newRoles.courses.filter(item => item.id !== body[0].id)
				break
			case this.roleEndpoints.addTA:
				newRoles.admins = [...newRoles.admins, data]
				newRoles.exceptions = [...newRoles.exceptions, data]
				break
			case this.roleEndpoints.removeTA:
				newRoles.admins = newRoles.admins.filter(item => item.username !== body)
				newRoles.exceptions = newRoles.exceptions.filter(item => item.username !== body)
				break
			case this.roleEndpoints.addException:
				newRoles.exceptions = [...newRoles.exceptions, data]
				break
			case this.roleEndpoints.removeException:
				newRoles.exceptions = newRoles.exceptions.filter(item => item.username !== body)
				break
			default:
				break
			}

			dispatch(this.actions.collectionRolesUpdate({ [collectionId]: newRoles }))
		} catch (error) {
			dispatch(this.actions.collectionsError(error))
		}

	}
}